import {Component, Input} from '@angular/core';
import {CommunicationEventsService} from '../../services/communication-events.service';
import {MyEvent} from '../../interfaces/MyEvent.interface';

@Component({
  selector: 'pages-events-join-button',
  imports: [],
  templateUrl: './join-button.component.html',
  styleUrl: './join-button.component.css'
})
export class JoinButtonComponent {

  @Input()
  public event!: MyEvent;

  public eventsJoined: number[] = [];

  constructor(public communicationEventsService: CommunicationEventsService) {
  }

  sendEventId() {
    this.communicationEventsService.emitEventId(this.event.id);
  }

  ngOnInit() {
    this.communicationEventsService.getEventsJoinedIds().subscribe(eventsJoined => {
      this.eventsJoined = eventsJoined;
    })
  }

  isJoined() {
    const today = new Date();
    const eventDateTime = new Date(`${this.event.date}T${this.event.start_time}`)
    if (eventDateTime < today) {
      return true;
    } else {
      return this.eventsJoined.includes(this.event.id);
    }
  }
}
