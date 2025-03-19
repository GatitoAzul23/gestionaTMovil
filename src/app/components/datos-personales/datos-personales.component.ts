import { Component, OnInit } from '@angular/core';
import { IonCheckbox } from '@ionic/angular/standalone';
import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
  standalone:false
})
export class DatosPersonalesComponent  implements OnInit {
  //para los iconos
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private router:Router, private menu:MenuController) { }

  ngOnInit() {}
  
  categoriaNombre: string = '';
  categorias: any[] = [];
  categoriasSeleccionadas: string[] = [];

  usuario ={
    nombre:"",
    apellidoPa:"",
    apellidoMa:"",
    password:"",
    password_ant:"",
    correo: localStorage.getItem("correo"),
    categoriasIngreso :this.categoriasSeleccionadas,
  }


  actualizarCategoria(nombre: string, checked: boolean) {
    if (checked) {
      this.categoriasSeleccionadas.push(nombre);
    } else {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(cat => cat !== nombre);
    }
  }

  limpiarCampos(){

  }

  aceptar(){
    this.router.navigate(['/inicio']);
  }

   agregarCategoria() {
    if (this.categoriaNombre) {
      this.categorias.push({
        nombre: this.categoriaNombre,
        activo: true
      });
      this.categoriaNombre = '';
    }
  }


}
