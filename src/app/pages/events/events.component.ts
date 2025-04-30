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
    this.eventsService.getEventsByCity("Málaga").subscribe(
      (res) => {
        this.events = res.events;
        this.loading = false;
      }
    );
    this.communicationEventsService.eventId$.subscribe((id: number) => {
      this.joinEvent(id);
    });
    if (this.authService.isAuthenticated()) {
      this.eventsService.getJoinedEvents().subscribe(
        (res) => {
          res = res.events;
          this.joinedEventsIds = res.map((event: { id: number; }) => event.id);
          this.communicationEventsService.setEventsJoinedIds(this.joinedEventsIds);
        }
      );
    }
  }

  public getSubcategories(category_id: string) {
    this.eventsService.getSubcategories(Number(category_id)).subscribe(
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
        },
        error: (err) => {
          console.log(err)
        }
        }
      );
    } else {
      this.router.navigate(['/login'])
    }
  }

  filterByCity(city: string) {
    console.log(city);
    this.events = [];
    this.loading = true;
    this.eventsService.getEventsByCity(city).subscribe(
      (res) => {
        this.events = res.events;
        this.loading = false;
      }
    );

  }
}
