import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private readonly apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private readonly http: HttpClient) {}

  search(query: string): Observable<any[]> {
    if (!query || query.length < 3) {
      return of([]); // Evita peticiones por términos muy cortos
    }

    const params = new HttpParams()
      .set('q', query)
      .set('format', 'json')
      .set('addressdetails', '1')
      .set('limit', '5');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    return this.http.get<any[]>(this.apiUrl, { params, headers }).pipe(
      catchError((error) => {
        console.error('Error buscando dirección:', error);
        return of([]);
      })
    );
  }
}
