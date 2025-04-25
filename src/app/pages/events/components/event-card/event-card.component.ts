import {Component, Input} from '@angular/core';
import {MyEvent} from '../../interfaces/MyEvent.interface';

@Component({
  selector: 'pages-events-event-card',
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input()
  public event!: MyEvent;
}
