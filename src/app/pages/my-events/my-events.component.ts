import { Component } from '@angular/core';
import {ButtonCreateEventComponent} from '../events/components/button-create-event/button-create-event.component';
import {EventFilterComponent} from '../events/components/event-filter/event-filter.component';
import {EventImgComponent} from '../events/components/event-img/event-img.component';
import {EventsListComponent} from '../events/components/events-list/events-list.component';
import {LocationMapComponent} from '../events/components/location-map/location-map.component';
import {Category} from '../events/interfaces/Category.interface';
import {Subcategory} from '../events/interfaces/Subcategory.interface';
import {City} from '../events/interfaces/City.interface';
import {MyEvent} from '../events/interfaces/MyEvent.interface';
import {EventsFilters} from '../events/interfaces/EventsFilters.interface';
import {EventsService} from '../events/services/events.service';
import {CommunicationEventsService} from '../events/services/communication-events.service';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pages-my-events',
  imports: [
    ButtonCreateEventComponent,
    EventFilterComponent,
    EventImgComponent,
    EventsListComponent,
    LocationMapComponent
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public cities: City[] = [];
  public events: MyEvent[] = [];
  public oldEvents: MyEvent[] = [];
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
    this.eventsService.getEventsByUser().subscribe(
      res => {
        const now = new Date();
        const events = res.events;

        this.oldEvents = events.filter(event => {
          const eventDateTime = new Date(`${event.date}T${event.start_time}`);
          return eventDateTime <= now;
        });

        this.events = events.filter(event => {
          const eventDateTime = new Date(`${event.date}T${event.start_time}`);
          return eventDateTime > now;
        });
        this.loading = false;
      }
    )
    this.eventsService.getJoinedEvents().subscribe(
      (res) => {
        res = res.events;
        this.joinedEventsIds = res.map((event: { id: number; }) => event.id);
        console.log(this.joinedEventsIds);
        this.communicationEventsService.setEventsJoinedIds(this.joinedEventsIds);
      }
    );
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
