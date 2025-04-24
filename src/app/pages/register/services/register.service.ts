import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private readonly http: HttpClient) {
  }

  private readonly apiUrl = 'http://localhost:8000/api/';

  public registerUser(newUser: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, newUser);
  }
}
