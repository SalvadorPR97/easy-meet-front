import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import * as L from 'leaflet';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NominatimService} from '../../services/nominatim.service';

@Component({
  selector: 'pages-events-location-map',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {
  @Input()
  public location: string = "assets/img/googlemaps.png";
  //TODO que empiece iniciado en malaga
  addressControl = new FormControl('');
  suggestions: any[] = [];
  map!: L.Map;
  marker!: L.Marker;

  constructor(private readonly nominatim: NominatimService) {}

  ngOnInit(): void {
    this.addressControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // @ts-ignore
      switchMap(value => this.nominatim.search(value))
    ).subscribe(results => {
      this.suggestions = results;
    });
  }

  selectSuggestion(suggestion: any): void {
    this.addressControl.setValue(suggestion.display_name);
    this.suggestions = [];
    // Aquí puedes usar leaflet para centrar el mapa
    console.log('Coordenadas:', suggestion.lat, suggestion.lon);
    this.showMap(suggestion.lat, suggestion.lon);
  }

  showMap(lat: number, lon: number): void {
    const coords: [number, number] = [lat, lon];
    if (!this.map) {
      this.map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.marker = L.marker(coords).addTo(this.map);
    } else {
      this.map.setView(coords, 13);
      this.marker.setLatLng(coords);
    }
  }
}
