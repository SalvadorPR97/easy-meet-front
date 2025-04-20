import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../interfaces/Category.interface';
import {Subcategory} from '../interfaces/Subcategory.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8000/api/';

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories`);
  }

  public getSubcategories(id: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}subcategories/${id}`);
  }
}
