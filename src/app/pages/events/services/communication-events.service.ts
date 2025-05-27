import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationEventsService {

  private readonly eventIdSourceToJoin = new Subject<number>();
  eventIdToJoin$ = this.eventIdSourceToJoin.asObservable();

  private readonly eventIdSourceToLeave = new Subject<number>();
  eventIdToLeave$ = this.eventIdSourceToLeave.asObservable();

  private readonly eventIdSourceToDelete = new Subject<number>();
  eventIdToDelete$ = this.eventIdSourceToDelete.asObservable();

  emitEventIdToJoin(id: number) {
    this.eventIdSourceToJoin.next(id);
  }
  emitEventIdToLeave(id: number) {
    this.eventIdSourceToLeave.next(id);
  }

  emitEventIdToDelete(id: number) {
    this.eventIdSourceToDelete.next(id);
  }

  private readonly eventsJoinedIds = new BehaviorSubject<number[]>([]);

  getEventsJoinedIds() {
    return this.eventsJoinedIds.asObservable();
  }

  setEventsJoinedIds(data: any) {
    this.eventsJoinedIds.next(data);
  }
}
