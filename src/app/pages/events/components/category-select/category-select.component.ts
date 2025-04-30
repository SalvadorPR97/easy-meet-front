import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Category} from '../../interfaces/Category.interface';

@Component({
  selector: 'pages-events-category-select',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.css'
})
export class CategorySelectComponent {
  @Input()
  public categories: Category[] = [];

  @Output()
  public categorySelectedEmitter: EventEmitter<number> = new EventEmitter<number>();

  emitCategorySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.categorySelectedEmitter.emit(Number(target.value));
  }


}
