import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Subcategory} from '../../interfaces/Subcategory.interface';

@Component({
  selector: 'pages-events-subcategory-select',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './subcategory-select.component.html',
  styleUrl: './subcategory-select.component.css'
})
export class SubcategorySelectComponent {
  @Input()
   public subcategories: Subcategory[] = [];

  @Output()
  public subcategorySelectedEmitter: EventEmitter<number> = new EventEmitter<number>();

  emitSubcategorySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.subcategorySelectedEmitter.emit(Number(target.value));
  }
}
