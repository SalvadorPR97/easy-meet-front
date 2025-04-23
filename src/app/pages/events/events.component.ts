import { Component } from '@angular/core';
import {LocationMapComponent} from './components/location-map/location-map.component';
import {EventImgComponent} from './components/event-img/event-img.component';
import {EventFilterComponent} from './components/event-filter/event-filter.component';
import {EventsListComponent} from './components/events-list/events-list.component';
import {Category} from './interfaces/Category.interface';
import {EventsService} from './services/events.service';
import {Subcategory} from './interfaces/Subcategory.interface';
import {MyEvent} from './interfaces/MyEvent.interface';

@Component({
  selector: 'pages-events',
  imports: [
    LocationMapComponent,
    EventImgComponent,
    EventFilterComponent,
    EventsListComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public events: MyEvent[] = [];
  public loading = true;

  constructor(public eventsService: EventsService) {
  }

  ngOnInit(){
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
    )
  }

  public getSubcategories(category_id: string) {
    this.eventsService.getSubcategories(Number(category_id)).subscribe(
      (res) => {
        this.subcategories = res;
      }
    );
  }
}
