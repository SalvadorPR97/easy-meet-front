import { Component } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {Category} from '../../interfaces/Category.interface';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'pages-events-create-event',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];
  public minDate!: string;
  public sending: boolean = false;
  public eventForm: FormGroup;

  constructor(public eventsService: EventsService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      image: [null],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: [''],
      minParticipant: [0, [Validators.required, Validators.min(0)]],
      maxParticipant: [2, Validators.min(2)],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit() {
    this.eventsService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      }
    );
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  public getSubcategories(event: Event) {
    const selectedSubcategory = event.target as HTMLSelectElement;
    const id: number = Number(selectedSubcategory.value);
    this.eventsService.getSubcategories(id).subscribe(
      (res) => {
        this.subcategories = res;
      }
    );
  }

  onSubmit() {
    console.log(this.eventForm.value);
    if (this.eventForm.valid) {
      this.sending = true;
      console.log(this.eventForm.value);
      //TODO logica para enviar al backend
    } else {
      console.log(this.eventForm.errors);
      this.eventForm.markAllAsTouched();
    }
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
