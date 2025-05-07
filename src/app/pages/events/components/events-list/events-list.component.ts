import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output()
  public eventImgUrlEmitter: EventEmitter<MyEvent> = new EventEmitter<MyEvent>();
  @Input()
  loading = true;
  skeletons = Array(3);

  emitEventImgUrl(event: MyEvent): void {
    this.eventImgUrlEmitter.emit(event);
  }
}
