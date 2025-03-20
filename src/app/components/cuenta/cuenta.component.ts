import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  standalone: false
})
export class CuentaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  usuario = {
    nomUsuario: '',
    password: '',
    password_ant: '',
    tipo: '',
  };

  actualizarContra(){
    
  }

}
