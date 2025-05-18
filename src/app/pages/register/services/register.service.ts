import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) {
  }

  private readonly apiUrl = environment.apiUrl;

  public registerUser(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, data);
  }

  public getProvinces(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>('/assets/data/provinces.json');
  }
}
