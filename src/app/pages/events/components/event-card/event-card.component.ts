import {Component, Input} from '@angular/core';
import {MyEvent} from '../../interfaces/MyEvent.interface';
import {JoinButtonComponent} from '../join-button/join-button.component';

@Component({
  selector: 'pages-events-event-card',
  imports: [
    JoinButtonComponent
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input()
  public event!: MyEvent;
}
