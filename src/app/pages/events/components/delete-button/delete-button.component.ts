import {Component, Input} from '@angular/core';
import {CommunicationEventsService} from '../../services/communication-events.service';
import {MyEvent} from '../../interfaces/MyEvent.interface';

declare const bootstrap: any;

@Component({
  selector: 'pages-events-delete-button',
  imports: [],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {
  @Input()
  public event!: MyEvent;
  public eventId: number = 0;

  constructor(public communicationEventsService: CommunicationEventsService) {
  }

  ngOnInit() {
    this.eventId = this.event.id;
  }

  sendEventId() {
    this.communicationEventsService.emitEventIdToDelete(this.event.id);
  }

  openConfirmModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
    modal.show();
  }

  confirmDelete(): void {
    this.communicationEventsService.emitEventIdToDelete(this.eventId);
    bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')!)?.hide();
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
