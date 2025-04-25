import {Component, Input} from '@angular/core';

@Component({
  selector: 'pages-events-location-map',
  imports: [],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {
  @Input()
  public location: string = "assets/img/googlemaps.png";
  //TODO añadir API google maps
}
