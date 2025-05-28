import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'pages-events-location-map',
  imports: [ReactiveFormsModule],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {
  map!: L.Map;
  marker!: L.Marker;

  private readonly defaultCoords: [number, number] = [36.7213028, -4.4216366];

  @Input()
  public location: { lat: number; lng: number } = {
    lat: this.defaultCoords[0],
    lng: this.defaultCoords[1]
  };

  private readonly icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '',
    shadowSize: [0, 0]
  });

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.defaultCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(this.defaultCoords, { icon: this.icon }).addTo(this.map);
    this.updateMapView();
  }

  ngOnChanges(): void {
    if (this.map && this.marker) {
      this.updateMapView();
    }
  }

  private updateMapView(): void {
    const coords: [number, number] = [this.location.lat, this.location.lng];
    const isDefault = this.location.lat === this.defaultCoords[0] && this.location.lng === this.defaultCoords[1];

    this.map.setView(coords, isDefault ? 13 : 17);
    this.marker.setLatLng(coords);
  }
}
