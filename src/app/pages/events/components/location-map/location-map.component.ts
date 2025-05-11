import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'pages-events-location-map',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {
  map!: L.Map;
  marker!: L.Marker;

  @Input()
  set location(value: { lat: number, lng: number }) {
    if (this.map && this.marker) {
      this.showMap(value.lat, value.lng);
    }
  }

  ngAfterViewInit(): void {
    const malagaCoords: [number, number] = [36.7213028, -4.4216366];
    this.map = L.map('map').setView(malagaCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(malagaCoords).addTo(this.map);
  }

  showMap(lat: number, lon: number): void {
    const coords: [number, number] = [lat, lon];
    this.map.setView(coords, 17);
    this.marker.setLatLng(coords);
  }
}
