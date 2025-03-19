import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.scss'],
  standalone: false
})
export class SuscripcionesComponent  implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor() { }

  ngOnInit() {}

}
