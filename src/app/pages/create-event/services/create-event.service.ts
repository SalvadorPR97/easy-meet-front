import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyEvent} from '../../events/interfaces/MyEvent.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private readonly http: HttpClient) { }
  private apiUrl: string = environment.apiUrl;

  public postEvent(event: FormData): Observable<MyEvent> {
    return this.http.post<MyEvent>(`${this.apiUrl}events/store`, event);
  }
}
