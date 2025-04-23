import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategorySelectComponent} from "../category-select/category-select.component";
import {Category} from "../../interfaces/Category.interface";
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {SubcategorySelectComponent} from '../subcategory-select/subcategory-select.component';

@Component({
  selector: 'pages-events-event-filter',
  imports: [
    CategorySelectComponent,
    SubcategorySelectComponent
  ],
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.css'
})
export class EventFilterComponent {
  @Input()
  public categories: Category[] = [];
  @Input()
  public subcategories: Subcategory[] = [];
  @Output()
  public categoryIdEmitter: EventEmitter<string> = new EventEmitter<string>();

  emitCategoryId(category_id: string): void {
    this.categoryIdEmitter.emit(category_id);
  }

}
