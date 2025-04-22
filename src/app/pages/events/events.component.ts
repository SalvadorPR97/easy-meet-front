import { Component } from '@angular/core';
import {LocationMapComponent} from './components/location-map/location-map.component';
import {EventImgComponent} from './components/event-img/event-img.component';
import {EventFilterComponent} from './components/event-filter/event-filter.component';
import {EventsListComponent} from './components/events-list/events-list.component';
import {Category} from './interfaces/Category.interface';
import {EventsService} from './services/events.service';

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

  constructor(public eventsService: EventsService) {
  }

  ngOnInit(){
    this.eventsService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      }
    );
  }
}
