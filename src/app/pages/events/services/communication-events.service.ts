import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationEventsService {

  private readonly eventIdSource = new Subject<number>();
  eventId$ = this.eventIdSource.asObservable();

  private readonly eventIdSourceToDelete = new Subject<number>();
  eventIdToDelete$ = this.eventIdSourceToDelete.asObservable();

  emitEventId(id: number) {
    this.eventIdSource.next(id);
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
