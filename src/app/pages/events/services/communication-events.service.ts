import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationEventsService {

  private readonly eventIdSource = new Subject<number>();
  eventId$ = this.eventIdSource.asObservable();

  emitEventId(id: number) {
    this.eventIdSource.next(id);
  }
}
