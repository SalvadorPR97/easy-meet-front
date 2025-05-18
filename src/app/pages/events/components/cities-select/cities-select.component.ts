import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {City} from '../../interfaces/City.interface';

@Component({
  selector: 'pages-events-cities-select',
  imports: [
    FormsModule
  ],
  templateUrl: './cities-select.component.html',
  styleUrl: './cities-select.component.css'
})
export class CitiesSelectComponent {
  @Input()
  public cities: City[] = [];

  @Output()
  public citySelectedEmitter: EventEmitter<string> = new EventEmitter<string>();

  emitCitySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.citySelectedEmitter.emit(target.value);
  }
}
