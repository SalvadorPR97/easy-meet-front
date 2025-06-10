import {Component, Input} from '@angular/core';
import {UserPublic} from '../../interfaces/UserPublic.interface';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'pages-events-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input()
  public user!: UserPublic;
  public profile_picture: string = "assets/img/placeholder_profile_pic.png";
  public imgUrl = environment.imgUrl;

  ngOnInit() {
    if (this.user.profile_pic) {
      this.profile_picture = this.user.profile_pic;
    }
  }
}
