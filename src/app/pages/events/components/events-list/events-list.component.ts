import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventCardComponent} from '../event-card/event-card.component';
import {MyEvent} from '../../interfaces/MyEvent.interface';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {Category} from '../../interfaces/Category.interface';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'pages-events-events-list',
  imports: [
    EventCardComponent,
    NgxPaginationModule,
  ],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  @Input()
  public events: MyEvent[] = [];
  @Input()
  public categories: Category[] = [];
  @Input()
  public subcategories: Subcategory[] = [];
  @Input()
  loading = true;
  @Output()
  public eventImgUrlEmitter: EventEmitter<MyEvent> = new EventEmitter<MyEvent>();
  skeletons = Array(3);
  public page = 1;
  public itemsPerPage = 5;
  @Input()
  paginationId: string = 'default';

  emitEventImgUrl(event: MyEvent): void {
    this.eventImgUrlEmitter.emit(event);
  }
}
