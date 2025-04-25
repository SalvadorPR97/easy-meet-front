import {Component, Input} from '@angular/core';
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
}
