import {Component, Input} from '@angular/core';
import {CommunicationEventsService} from '../../services/communication-events.service';

@Component({
  selector: 'pages-events-join-button',
  imports: [],
  templateUrl: './join-button.component.html',
  styleUrl: './join-button.component.css'
})
export class JoinButtonComponent {

  @Input()
  public eventId: number = 0;

  public eventsJoined: number[] = [];

  constructor(public communicationEventsService: CommunicationEventsService) {
  }

  sendEventId() {
    this.communicationEventsService.emitEventId(this.eventId);
  }

  ngOnInit() {
    this.communicationEventsService.getEventsJoinedIds().subscribe(eventsJoined => {
      this.eventsJoined = eventsJoined;
    })
  }

  isJoined() {
    return this.eventsJoined.includes(this.eventId);
  }
}
