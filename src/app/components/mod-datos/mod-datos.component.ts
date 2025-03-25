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

  constructor(private servicioLogin:LoginService, 
    private alertCtrl:AlertController) { }

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
    estatus:'Activo',
    usuario: localStorage.getItem("correo")
  }
  egreso = {
    categoria: '',
    estatus: 'Activo',
    usuario: localStorage.getItem("correo")
  };

  usuario = {
    email: localStorage.getItem('correo')
  }


  usuarioIngreso ={
    usuario :localStorage.getItem("correo"),
    categoriasIngreso : this.ingreso
  }

  usuarioEgreso ={
    usuario :localStorage.getItem("correo"),
    categoriasEgreso : this.egreso
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
    this.servicioLogin.agregarIngreso(this.usuarioIngreso).subscribe(
      res=>{
        this.presentAlertIngreso();
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }//fin de agregar ingreso

  agregarEgreso(){
    this.servicioLogin.agregarEgreso(this.usuarioEgreso).subscribe(
      res=>{
        this.presentAlertEgreso();
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  eliminaIng(ing:any){
    this.servicioLogin.eliminarIngreso(ing).subscribe(
      res=>{
        this.presentAlertEliminaIngreso();
      },
      err=>{
        this.presentAlertError(err);
      }
    );
    console.log(ing);
  }
  eliminaEgr(egr:any){
    this.servicioLogin.eliminaEgreso(egr).subscribe(
      res=>{
        this.presentAlertEliminaEgreso();
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  consultar(){
    this.servicioLogin.categoriasFiltradas(this.usuario).subscribe(
      res=>{
        //console.log(res);
        this.ingresos = res.categoriasFiltradas.Ingresos;
        this.egresos = res.categoriasFiltradas.Egresos;
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  async presentAlertIngreso() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Ingreso registrado correctamente',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            this.limpiarCamposIngreso();
            location.reload();
            return true; // Permite que la alerta se cierre
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertEgreso() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Ingreso registrado correctamente',
     buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            this.limpiarCamposEgreso();
            location.reload();
            return true; // Permite que la alerta se cierre
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertError(err:any) {
    if(typeof(err.error)=="string"){
      const alert = await this.alertCtrl.create({
        header: 'Algo salio mal',
        message: err.error,
        buttons: ['Cerrar']
      });
      await alert.present();
    }
    
  }


  async presentAlertEliminaIngreso() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Ingreso eliminado correctamente',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            //this.limpiarCamposIngreso();
            location.reload();
            return true; // Permite que la alerta se cierre
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertEliminaEgreso() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Ingreso eliminado correctamente',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            //this.limpiarCamposIngreso();
            location.reload();
            return true; // Permite que la alerta se cierre
          }
        }
      ]
    });
    await alert.present();
  }

  limpiarCamposIngreso(){
    this.ingreso.cantidad = "";
    this.ingreso.categoria="";
    this.ingreso.frecuencia="";
  }

  limpiarCamposEgreso(){
    this.egreso.categoria="";
  }

}
