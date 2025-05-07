import {Component, Input} from '@angular/core';
import {CommunicationEventsService} from '../../services/communication-events.service';
import {MyEvent} from '../../interfaces/MyEvent.interface';

@Component({
  selector: 'pages-events-delete-button',
  imports: [],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {
  @Input()
  public event!: MyEvent;

  constructor(public communicationEventsService: CommunicationEventsService) {
  }

  sendEventId() {
    this.communicationEventsService.emitEventIdToDelete(this.event.id);
  }

  hideButton() {
    const today = new Date();
    const eventDateTime = new Date(`${this.event.date}T${this.event.start_time}`)
    if (eventDateTime < today) {
      return true;
    } else {
      return this.event.owner_id != Number(localStorage.getItem('userId'));
    }
  }
}
