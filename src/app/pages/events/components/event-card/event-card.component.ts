import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output()
  public eventImgUrlEmitter: EventEmitter<string> = new EventEmitter<string>();

  emitEvent(event_image_url: string): void {
    this.eventImgUrlEmitter.emit(event_image_url);
  }
}
