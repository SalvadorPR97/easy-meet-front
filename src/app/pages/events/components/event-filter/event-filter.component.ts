import {Component, Input} from '@angular/core';
import {CategorySelectComponent} from "../category-select/category-select.component";
import {Category} from "../../interfaces/Category.interface";

@Component({
  selector: 'pages-events-event-filter',
    imports: [
        CategorySelectComponent
    ],
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.css'
})
export class EventFilterComponent {
  @Input()
   public categories: Category[] = [];
}
