import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'core-header',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
    this.authService.deleteToken();
    window.location.reload();
  }
}
