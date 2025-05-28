import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private readonly apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private readonly http: HttpClient) {}

  search(query: string): Observable<any[]> {
    if (!query || query.length < 3) {
      return of([]);
    }

    const params = new HttpParams()
      .set('q', query)
      .set('format', 'json')
      .set('addressdetails', '1')
      .set('countrycodes', 'es')
      .set('limit', '5');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    return this.http.get<any[]>(this.apiUrl, { params, headers }).pipe(
      map(results => results.map(result => ({
        ...result,
        short_display: this.formatShortAddress(result.address)
      }))),
      catchError((error) => {
        console.error('Error buscando dirección:', error);
        return of([]);
      })
    );
  }

  private formatShortAddress(address: any): string {
    const parts = [
      address.road,
      address.house_number,
      address.city || address.town || address.village,
      address.country
    ];
    return parts.filter(Boolean).join(', ');
  }

}
