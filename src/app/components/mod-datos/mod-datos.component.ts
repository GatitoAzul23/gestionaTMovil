import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-mod-datos',
  templateUrl: './mod-datos.component.html',
  styleUrls: ['./mod-datos.component.scss'],
  standalone: false
})
export class ModDatosComponent  implements OnInit {

  constructor(private servicioLogin:LoginService, private alertCtrl:AlertController) { }

  ngOnInit() {
    this.consultar();
  }

  
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

  usuario = {
    email: localStorage.getItem('correo')
  }

  

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

  consultar(){
    this.servicioLogin.consultarUno(this.usuario).subscribe(
      res=>{
        console.log(res);
        this.ingresos = res.usu.categoriasIngreso;
        this.egresos = res.usu.categoriasEgreso;
      },
      err=>{

      }
    );
  }

}
