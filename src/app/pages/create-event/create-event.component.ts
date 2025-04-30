import { Component } from '@angular/core';
import {EventsService} from '../events/services/events.service';
import {Category} from '../events/interfaces/Category.interface';
import {Subcategory} from '../events/interfaces/Subcategory.interface';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {dateNotInThePastValidator} from '../../core/validators/date.validator';
import {Router} from '@angular/router';
import {LocationMapComponent} from '../events/components/location-map/location-map.component';
import {EventImgComponent} from '../events/components/event-img/event-img.component';
import {CreateEventService} from './services/create-event.service';

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
  public imgUrl: string | ArrayBuffer | null  = "assets/img/fotoGrupoParque.jpg";
  public minDate!: string;
  public sending: boolean = false;
  public eventForm: FormGroup;

  constructor(public eventsService: EventsService,public createEventService: CreateEventService, private readonly fb: FormBuilder, public router: Router) {
    this.eventForm = this.fb.group({
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      event_image: [null],
      date: ['', [Validators.required, dateNotInThePastValidator()]],
      start_time: ['', Validators.required],
      end_time: [''],
      min_participants: [2, [Validators.required, Validators.min(2)]],
      max_participants: [2, Validators.min(2)],
      price: [0, [Validators.required, Validators.min(0)]],
      only_women: [false],
      only_men: [false],
      description: ['', Validators.required],
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
      this.eventForm.addControl('city', this.fb.control('Málaga'));
      this.createEventService.postEvent(this.eventForm.value).subscribe();
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

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(this.imgUrl);
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
