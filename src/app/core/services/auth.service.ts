import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl; // o la URL de tu backend

  constructor(private readonly http: HttpClient) {}
  private profilePicChanged = new BehaviorSubject<string | null>(null);
  profilePicChanged$ = this.profilePicChanged.asObservable();

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, credentials);
  }

  setProfilePicture(pic: string) {
    localStorage.setItem('profile_pic', pic);
    this.profilePicChanged.next(pic);
  }

  getProfilePicture(): string | null {
    return localStorage.getItem('profile_pic');
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
    this.setProfilePicture(user.profile_pic);
  }

  deleteUserInfo(): void {
    localStorage.clear()
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}user`);
  }
}
