import {Component, Input} from '@angular/core';
import {UserCardComponent} from '../user-card/user-card.component';
import {UserPublic} from '../../interfaces/UserPublic.interface';

@Component({
  selector: 'pages-events-user-list',
  imports: [
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input()
  public users: UserPublic[] = [];
}
