import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mod-datos',
  templateUrl: './mod-datos.component.html',
  styleUrls: ['./mod-datos.component.scss'],
  standalone: false
})
export class ModDatosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  //para los iconos
  faMinus =faMinus;
  faPlus = faPlus;
  //categorias: any;
  ingresos: any;
  egresos:any;

  ingreso = {
    categoria: '',
    cantidad: '',
    frecuencia: '',
  }

  egreso = {
    categoria: ''
  };

  

  //para los modales
  isModalOpenIngreso = false;
  isModalOpenEgreso = false;

  setOpenIngreso(isOpen: boolean) {
    this.isModalOpenIngreso = isOpen;
  }

  setOpenEgreso(isOpen:boolean){
    this.isModalOpenEgreso= isOpen;
  }

  agregarIngreso(){

  }

  agregarEgreso(){

  }

  eliminaIng(){

  }
  eliminaEgr(){

  }

}
