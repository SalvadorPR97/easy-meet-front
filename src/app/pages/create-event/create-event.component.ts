import { Component } from '@angular/core';
import {EventsService} from '../events/services/events.service';
import {Category} from '../events/interfaces/Category.interface';
import {Subcategory} from '../events/interfaces/Subcategory.interface';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {dateNotInThePastValidator} from '../../core/validators/date.validator';
import {Router} from '@angular/router';
import {LocationMapComponent} from '../events/components/location-map/location-map.component';
import {EventImgComponent} from '../events/components/event-img/event-img.component';
import {CreateEventService} from './services/create-event.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NominatimService} from '../events/services/nominatim.service';

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
  public selectedImage: File | null = null;
  public suggestions: any[] = [];
  public location = new FormControl('');
  public locationCoordinates: { lat: number; lng: number } = { lat: 0, lng: 0 };

  constructor(public eventsService: EventsService,public createEventService: CreateEventService, private readonly fb: FormBuilder, public router: Router,
              private readonly nominatim: NominatimService) {
    this.eventForm = this.fb.group({
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      title: ['', Validators.required],
      image: [null],
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
    this.location.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // @ts-ignore
      switchMap(value => this.nominatim.search(value))
    ).subscribe(results => {
      this.suggestions = results;
    });
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
      this.eventForm.addControl('city', this.fb.control(localStorage.getItem('city')));
      this.eventForm.addControl('location', this.fb.control(this.location.value));
      this.eventForm.addControl('latitude', this.fb.control(this.locationCoordinates.lat));
      this.eventForm.addControl('longitude', this.fb.control(this.locationCoordinates.lng));
      const formData = this.buildFormData();
      this.createEventService.postEvent(formData).subscribe();
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
    this.selectedImage = file;
  }

  private buildFormData(): FormData {
    const formData = new FormData();
    const form = this.eventForm.value;

    for (const key in form) {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    return formData;
  }
  selectSuggestion(suggestion: any): void {
    this.location.setValue(suggestion.display_name, { emitEvent: false });
    this.locationCoordinates = { lat: suggestion.lat, lng: suggestion.lon };
    this.suggestions = [];
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
