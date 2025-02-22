import { Component, OnInit } from '@angular/core';
import { IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
  standalone:false
})
export class DatosPersonalesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  

  usuario ={
    nombre:"",
    apellidoPa:"",
    apellidoMa:"",
    password:"",
    password_ant:"",
    correo: localStorage.getItem("correo")
  }

  cambiarContra(){

  }

  limpiarCampos(){

  }

  consultar(){
    
  }
}
