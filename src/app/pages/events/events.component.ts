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
import {Router} from '@angular/router';
import {City} from './interfaces/City.interface';
import {EventsFilters} from './interfaces/EventsFilters.interface';

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
  public cities: City[] = [];
  public events: MyEvent[] = [];
  public joinedEventsIds: number[] = [];
  public loading = true;
  public filters: EventsFilters = {};
  public imgUrl: string | ArrayBuffer | null  = "assets/img/fotoGrupoParque.jpg";

  constructor(public eventsService: EventsService, public communicationEventsService: CommunicationEventsService,
              public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.eventsService.getCities().subscribe(
      (res) => {
        this.cities = res.cities;
      }
    );
    this.eventsService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      }
    );
    this.communicationEventsService.eventId$.subscribe((id: number) => {
      this.joinEvent(id);
    });
    this.communicationEventsService.eventIdToDelete$.subscribe((id: number) => {
      //TODO delete events
      console.log(id);
    })
    if (this.authService.isAuthenticated()) {
      const city: string | null = localStorage.getItem('city');
      if (city) {
        this.getEventsByCity(city);
      }
      this.eventsService.getJoinedEvents().subscribe(
        (res) => {
          res = res.events;
          this.joinedEventsIds = res.map((event: { id: number; }) => event.id);
          this.communicationEventsService.setEventsJoinedIds(this.joinedEventsIds);
        }
      );
    } else {
      this.getEventsByCity("Marbella");
    }
  }

  public getSubcategories(category_id: number) {
    this.eventsService.getSubcategories(category_id).subscribe(
      (res) => {
        this.subcategories = res;
      }
    );
  }

  joinEvent(id: number) {
    if (this.authService.isAuthenticated()) {
      this.eventsService.joinEvent(id).subscribe({
          next: () => {
            window.location.reload();
          }
        }
      );
    } else {
      this.router.navigate(['/login'])
    }
  }

  getEventsByCity(city: string) {
    this.events = [];
    this.loading = true;
    this.eventsService.getEventsByCity(city).subscribe(
      (res) => {
        this.events = res.events;
        this.loading = false;
      }
    )
  }

  categoryReceived(category_id: number) {
    this.getSubcategories(category_id);
    this.addCategoryToFilter(category_id);
  }

  addCityToFilter(city: string) {
    this.filters.city = city;
    this.filterEvents();
  }
  addCategoryToFilter(category_id: number) {
    this.filters.category_id = category_id;
    this.filterEvents();
  }
  addSubcategoryToFilter(subcategory_id: number) {
    this.filters.subcategory_id = subcategory_id;
    this.filterEvents();
  }

  filterEvents() {
    this.events = [];
    this.loading = true;
    this.eventsService.filterEvents(this.filters).subscribe(
      (res) => {
        this.events = res.events;
        this.loading = false;
      }
    )
  }
  chargeEventImg(event_image_url: string) {
    this.imgUrl = 'http://localhost:8000' + event_image_url;
  }
}
