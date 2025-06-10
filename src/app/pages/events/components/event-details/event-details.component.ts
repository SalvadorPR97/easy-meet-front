import {Component, Input} from '@angular/core';
import {MyEvent} from '../../interfaces/MyEvent.interface';
import {DeleteButtonComponent} from '../delete-button/delete-button.component';
import {JoinButtonComponent} from '../join-button/join-button.component';
import {Category} from '../../interfaces/Category.interface';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {environment} from '../../../../../environments/environment';
import {LocationMapComponent} from '../location-map/location-map.component';
import {UserListComponent} from '../user-list/user-list.component';
import {UserPublic} from '../../interfaces/UserPublic.interface';

@Component({
  selector: 'pages-events-event-details',
  imports: [
    DeleteButtonComponent,
    JoinButtonComponent,
    LocationMapComponent,
    UserListComponent,
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  @Input()
   public event!: MyEvent;
  @Input()
  public categories: Category[] = [];
  @Input()
  public subcategories: Subcategory[] = [];

  public users: UserPublic[] = [];

  public imgUrl = environment.imgUrl;
  public latLong: { lat: number; lng: number } = { lat: 0, lng: 0 };

  ngOnChanges() {
    this.latLong = { lat: this.event.latitude, lng: this.event.longitude };
  }

}
