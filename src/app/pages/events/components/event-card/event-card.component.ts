import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MyEvent} from '../../interfaces/MyEvent.interface';
import {JoinButtonComponent} from '../join-button/join-button.component';
import {environment} from '../../../../../environments/environment';
import {DeleteButtonComponent} from '../delete-button/delete-button.component';
import {Category} from '../../interfaces/Category.interface';
import {Subcategory} from '../../interfaces/Subcategory.interface';


@Component({
  selector: 'pages-events-event-card',
  imports: [
    JoinButtonComponent,
    DeleteButtonComponent
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input()
  public event!: MyEvent;
  @Input()
  public categories: Category[] = [];
  @Input()
  public subcategories: Subcategory[] = [];
  @Output()
  public eventImgUrlEmitter: EventEmitter<MyEvent> = new EventEmitter<MyEvent>();

  public imgUrl = environment.imgUrl;

  emitEvent(): void {
    this.eventImgUrlEmitter.emit(this.event);
  }

  ngOnInit() {
    this.adaptLocation();
    this.event.date = new Intl.DateTimeFormat('es-ES').format(new Date(this.event.date))
  }

  adaptLocation() {
    let splitted = this.event.location.split(',');
    if (isNaN(Number(splitted[0]))) {
      if (isNaN(Number(splitted[1]))) {
        this.event.location = splitted[0] + ' S/N'
      } else {
        this.event.location = splitted[0] + ' Nº ' + splitted[1];
      }
    } else {
      this.event.location = splitted[1] + ' Nº ' + splitted[0];
    }
  }

  protected readonly environment = environment;
}
