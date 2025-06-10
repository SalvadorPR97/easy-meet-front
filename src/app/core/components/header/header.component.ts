import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'core-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public profile_picture: string = "assets/css/usuario.png";
  public imgUrl = environment.imgUrl;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('profile_pic')) {
      this.profile_picture = this.imgUrl + localStorage.getItem('profile_pic');
    } else {
      this.authService.profilePicChanged$.subscribe(
        response => {
          this.profile_picture = this.imgUrl + response;
        }
      )
    }
  }

  onLogout() {
    this.authService.logout();
    this.authService.deleteToken();
    this.authService.deleteUserInfo();
    window.location.reload();
  }
}
