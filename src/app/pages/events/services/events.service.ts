import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../interfaces/Category.interface';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {MyEvent} from '../interfaces/MyEvent.interface';
import {environment} from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private readonly http: HttpClient) {
  }

  private readonly apiUrl = environment.apiUrl;

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories`);
  }

  public getSubcategories(id: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}subcategories/${id}`);
  }

  public getEventsByCity(city: string): Observable<{ events: MyEvent[] }> {
    return this.http.get<{ events: MyEvent[] }>(`${this.apiUrl}events/${city}`);
  }
}
