import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategorySelectComponent} from "../category-select/category-select.component";
import {Category} from "../../interfaces/Category.interface";
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {SubcategorySelectComponent} from '../subcategory-select/subcategory-select.component';
import {CitiesSelectComponent} from '../cities-select/cities-select.component';
import {City} from '../../interfaces/City.interface';

@Component({
  selector: 'pages-events-event-filter',
  imports: [
    CategorySelectComponent,
    SubcategorySelectComponent,
    CitiesSelectComponent
  ],
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.css'
})
export class EventFilterComponent {
  @Input()
  public cities: City[] = [];
  @Input()
  public categories: Category[] = [];
  @Input()
  public subcategories: Subcategory[] = [];
  @Output()
  public categoryIdEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public cityNameEmitter: EventEmitter<string> = new EventEmitter<string>();

  emitCategoryId(category_id: string): void {
    this.categoryIdEmitter.emit(category_id);
  }
  emitCityName(city_name: string): void {
    this.cityNameEmitter.emit(city_name);
  }

}
