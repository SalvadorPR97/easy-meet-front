import {Component, Input} from '@angular/core';

@Component({
  selector: 'pages-events-event-img',
  imports: [],
  templateUrl: './event-img.component.html',
  styleUrl: './event-img.component.css'
})
export class EventImgComponent {
  @Input()
  eventImg: string = "assets/img/fotoGrupoParque.jpg";
  //TODO que se actualice con la imagen del evento
}
