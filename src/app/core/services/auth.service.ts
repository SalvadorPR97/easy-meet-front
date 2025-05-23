import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl; // o la URL de tu backend

  constructor(private readonly http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}logout`, {});
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  setUserInfo(user: any): void {
    localStorage.setItem('city', user.city);
    localStorage.setItem('userId', user.id);
  }

  deleteUserInfo(): void {
    localStorage.removeItem('city');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}user`);
  }
}
