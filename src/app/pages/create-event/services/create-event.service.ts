import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyEvent} from '../../events/interfaces/MyEvent.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private readonly http: HttpClient) { }
  private apiUrl: string = 'http://localhost:8000/api/';

  public postEvent(event: MyEvent): Observable<MyEvent> {
    return this.http.post<MyEvent>(`${this.apiUrl}events/store`, event);
  }
}
