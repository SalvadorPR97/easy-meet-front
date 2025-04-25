import {Component, Input} from '@angular/core';
import {EventCardComponent} from '../event-card/event-card.component';
import {MyEvent} from '../../interfaces/MyEvent.interface';

@Component({
  selector: 'pages-events-events-list',
  imports: [
    EventCardComponent
  ],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  @Input()
  public events: MyEvent[] = [];
  @Input()
  loading = true;
  skeletons = Array(3);
}
