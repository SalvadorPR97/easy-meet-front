import { Component } from '@angular/core';
import {EventsService} from '../events/services/events.service';
import {Category} from '../events/interfaces/Category.interface';
import {Subcategory} from '../events/interfaces/Subcategory.interface';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {dateNotInThePastValidator} from '../../core/validators/date.validator';
import {Router} from '@angular/router';
import {LocationMapComponent} from '../events/components/location-map/location-map.component';
import {EventImgComponent} from '../events/components/event-img/event-img.component';

@Component({
  selector: 'pages-events-create-event',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LocationMapComponent,
    EventImgComponent
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

  constructor(public eventsService: EventsService, private readonly fb: FormBuilder, public router: Router) {
    this.eventForm = this.fb.group({
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      event_image: [null],
      date: ['', [Validators.required, dateNotInThePastValidator()]],
      start_time: ['', Validators.required],
      end_time: [''],
      min_participant: [2, [Validators.required, Validators.min(2)]],
      max_participant: [2, Validators.min(2)],
      price: [0, [Validators.required, Validators.min(0)]],
      only_women: [false],
      only_men: [false],
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
    const modal = document.getElementById('createEventModal');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        // Redirigir a /eventos cuando el modal se cierre
        this.router.navigate(['/eventos']);
      });
    }
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
    if (this.eventForm.valid) {
      this.sending = true;
      console.log(this.eventForm.value);
      //TODO logica para enviar al backend
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  toggleSelection(option: 'only_women' | 'only_men') {
    if (option === 'only_women') {
      this.eventForm.patchValue({ only_women: !this.eventForm.get('only_women')?.value, only_men: false });
    } else {
      this.eventForm.patchValue({ only_men: !this.eventForm.get('only_men')?.value, only_women: false });
    }
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
