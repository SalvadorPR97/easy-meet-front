import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../interfaces/Category.interface';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {environment} from '../../../../environments/environment';
import {City} from '../interfaces/City.interface';
import {EventsFilters} from '../interfaces/EventsFilters.interface';
import {MyEventRes} from '../interfaces/MyEventRes.interface';

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

  public getAllSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}subcategories/`);
  }

  public getEventsByCity(city: string): Observable<MyEventRes> {
    return this.http.get<MyEventRes>(`${this.apiUrl}events/city/${city}`);
  }

  public joinEvent(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}eventsUsers/join/${id}`, {});
  }

  public leaveEvent(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}eventsUsers/leave/${id}`, {});
  }

  public getJoinedEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}eventsUsers/joined`);
  }

  public getCities(): Observable<{ cities: City[] }> {
    return this.http.get<{ cities: City[] }>(`${this.apiUrl}events/citiesAll`);
  }

  public getCitiesByOwner(owner_id: string | null): Observable<{ cities: City[] }> {
    return this.http.get<{ cities: City[] }>(`${this.apiUrl}events/cities/${owner_id}`);
  }

  public filterEvents(filters: EventsFilters): Observable<MyEventRes> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<MyEventRes>(`${this.apiUrl}events/filter`, {params});
  }

  public getEventsByUser(filters: EventsFilters): Observable<MyEventRes> {
    return this.http.post<MyEventRes>(`${this.apiUrl}events/userEvents`, filters);
  }

  public deleteEvent(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}events/delete/${id}`);
  }

  public getUsersInEvent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}eventsUsers/usersInEvent/${id}`);
  }
}
