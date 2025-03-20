import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: false
})
export class InicioComponent  implements OnInit {

  constructor() { }
  

  ngOnInit() {}
  egreso ={
    categoria: '',
    cantidad: 0,
    fecha: '',
  }

  usuario= {
    categoria: ''
  }
  // Modal
    isModalOpen = false;
    isModal2Open = false;
  
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }

    setOpenModal2(isOpen: boolean) {
      this.isModal2Open = isOpen;
      console.log("No esta abriendo el modal");
    }

    registrar(){
      
    }

}
