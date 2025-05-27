import {Component} from '@angular/core';
import {LocationMapComponent} from './components/location-map/location-map.component';
import {EventImgComponent} from './components/event-img/event-img.component';
import {EventFilterComponent} from './components/event-filter/event-filter.component';
import {EventsListComponent} from './components/events-list/events-list.component';
import {Category} from './interfaces/Category.interface';
import {EventsService} from './services/events.service';
import {Subcategory} from './interfaces/Subcategory.interface';
import {MyEvent} from './interfaces/MyEvent.interface';
import {ButtonCreateEventComponent} from './components/button-create-event/button-create-event.component';
import {CommunicationEventsService} from './services/communication-events.service';
import {AuthService} from '../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router'; // <-- Import ActivatedRoute
import {City} from './interfaces/City.interface';
import {EventsFilters} from './interfaces/EventsFilters.interface';
import {environment} from '../../../environments/environment';

declare const bootstrap: any;

@Component({
  selector: 'pages-events',
  imports: [
    LocationMapComponent,
    EventImgComponent,
    EventFilterComponent,
    EventsListComponent,
    ButtonCreateEventComponent,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public allSubcategories: Subcategory[] = [];
  public cities: City[] = [];
  public events: MyEvent[] = [];
  public joinedEventsIds: number[] = [];
  public loading = true;
  public filters: EventsFilters = {};
  public imgUrl: string | ArrayBuffer | null = "assets/img/fotoGrupoParque.jpg";
  public serverImgUrl: string = environment.imgUrl;
  public selectedEventIdToDelete: number = 0;
  public deleting: boolean = false;
  public eventLocation: { lat: number; lng: number } = {lat: 0, lng: 0};

  constructor(
    public eventsService: EventsService,
    public communicationEventsService: CommunicationEventsService,
    public authService: AuthService,
    public router: Router,
    private readonly route: ActivatedRoute // <-- Inject ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.eventsService.getCities().subscribe(res => {
      this.cities = res.cities;
    });
    this.eventsService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.eventsService.getAllSubcategories().subscribe(res => {
      this.allSubcategories = res;
    });
    this.communicationEventsService.eventIdToJoin$.subscribe((id: number) => {
      this.joinEvent(id);
    });
    this.communicationEventsService.eventIdToLeave$.subscribe((id: number) => {
      this.eventsService.leaveEvent(id).subscribe(
        () => {
          window.location.reload();
        }
      );
    });
    this.communicationEventsService.eventIdToDelete$.subscribe((id: number) => {
      this.selectedEventIdToDelete = id;
      const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
      modal.show();
    });

    this.route.queryParams.subscribe(params => {
      this.filters = {...params};

      if (this.filters.category_id) this.filters.category_id = +this.filters.category_id;
      if (this.filters.subcategory_id) this.filters.subcategory_id = +this.filters.subcategory_id;

      if (this.filters.category_id) {
        this.getSubcategories(this.filters.category_id);
      } else {
        this.subcategories = [];
      }

      this.filterEvents();
    });

    if (this.authService.isAuthenticated()) {
      const city: string | null = localStorage.getItem('city');
      if (city) {
        this.setCityFilter(city);
      }
      this.eventsService.getJoinedEvents().subscribe(res => {
        res = res.events;
        this.joinedEventsIds = res.map((event: { id: number }) => event.id);
        this.communicationEventsService.setEventsJoinedIds(this.joinedEventsIds);
      });
    } else {
      this.setCityFilter("Málaga");
    }
  }

  public getSubcategories(category_id: number) {
    this.eventsService.getSubcategories(category_id).subscribe(res => {
      this.subcategories = res;
    });
  }

  joinEvent(id: number) {
    if (this.authService.isAuthenticated()) {
      this.eventsService.joinEvent(id).subscribe({
        next: () => {
          window.location.reload();
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  setCityFilter(city: string) {
    this.updateFilters({city});
  }

  categoryReceived(category_id: number) {
    this.getSubcategories(category_id);
    this.updateFilters({category_id});
  }

  addCityToFilter(city: string) {
    this.updateFilters({city});
  }

  addSubcategoryToFilter(subcategory_id: number) {
    this.updateFilters({subcategory_id});
  }

  updateFilters(newFilters: Partial<EventsFilters>) {
    this.filters = {...this.filters, ...newFilters};

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: 'merge',
    });
  }


  filterEvents() {
    this.events = [];
    this.loading = true;
    this.eventsService.filterEvents(this.filters).subscribe(res => {
      this.events = res.events;
      this.loading = false;
    });
  }

  chargeEvent(event: MyEvent) {
    this.imgUrl = this.serverImgUrl + event.image_url;
    this.eventLocation = {lat: event.latitude, lng: event.longitude};
  }

  confirmDelete() {
    this.deleting = true;
    this.eventsService.deleteEvent(this.selectedEventIdToDelete).subscribe(() => {
      window.location.reload();
    });
  }
}
