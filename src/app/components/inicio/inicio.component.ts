import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { IngresoService } from 'src/app/servicios/ingreso.service';
import { EgresoService } from 'src/app/servicios/egreso.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: false
})
export class InicioComponent  implements OnInit {

  constructor(
    private servicioLogin:LoginService, 
    private alertCtrl: AlertController,
    private servicioIngreso:IngresoService,
    private servicioEgreso:EgresoService,
    private router:Router) { }
  

  ngOnInit() {
    
    this.consultarUno();
  }
  
  egreso ={
    categoria: '',
    cantidad: '',
    fecha: '',
    descripcion: '',
    usuario:localStorage.getItem("correo")
  }

  ingreso ={
    categoria: '',
    cantidad: '',
    fecha: '',
    descripcion:'',
    usuario: localStorage.getItem("correo")
  }

  ingresos: any;
  egresos:any;

  usuario= {
    email: localStorage.getItem("correo"),
    categoriasIngreso: Array,
    categoriasEgreso: Array,
    saldo:0
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

  

    
    consultarUno(){
      this.servicioLogin.consultarUno(this.usuario).subscribe(
        res=>{
          this.usuario.saldo = res.usu.saldo;
          // this.egresos = res.usu.categoriasEgreso;
          // this.ingresos = res.usu.categoriasIngreso;
          this.ingresos = res.categoriasFiltradas.ingreso;
          this.egresos = res.categoriasFiltradas.egreso;
          console.log(res.categoriasFiltradas.ingreso);
          console.log(res.categoriasFiltradas.egreso);
          //localStorage.setItem("meta", res.usu.meta);
        },
        err=>{
          this.presentAlertError(err);
        }
      );
    }

    registrarIngreso(){
      //console.log(this.ingreso);
      this.servicioIngreso.registrar(this.ingreso).subscribe(
        res=>{
          this.presentAlertIngreso();
          this.limpiarCampos();
          //this.setOpenModal2(false);
          //this.router.navigate(['/ingresos']);
        },
        err=>{
          this.presentAlertError(err.message);
        }
      );
    }

    registrarEgreso(){
      this.servicioEgreso.registrar(this.egreso).subscribe(
        res=>{
          this.presentAlertEgresos();
          this.limpiarCamposE();
          //this.setOpen(false);
          //this.router.navigate(['/egresos']);
        },
        err=>{
          this.presentAlertError(err);
        }
      );
    }

    async presentAlertEgresos() {
      const alert = await this.alertCtrl.create({
        header: 'Exito',
        message: 'Información guardada correctamente',
        //buttons: ['Cerrar']
        buttons: [
          {
            text: 'Cerrar',
            handler: () => {
              // Lógica para borrar los campos
              this.limpiarCamposE();
              location.reload();
              return true; // Permite que la alerta se cierre
            }
          }
        ]
      });
      await alert.present();
    }

    async presentAlertIngreso() {
      const alert = await this.alertCtrl.create({
        header: 'Exito',
        message: 'Información guardada correctamente',
        //buttons: ['Cerrar']
        buttons: [
          {
            text: 'Cerrar',
            handler: () => {
              // Lógica para borrar los campos
              this.limpiarCampos();
              location.reload();
              return true; // Permite que la alerta se cierre
            }
          }
        ]
      });
      await alert.present();
    }
  
  
    async presentAlertError(error:any) {
      const alert = await this.alertCtrl.create({
        header: 'Algo salió mal',
        //message: ,
        buttons: ['Cerrar']
      });
      await alert.present();
    }//fin de presentAlertError

    limpiarCampos(){
      this.ingreso.categoria = '',
      this.ingreso.cantidad = '',
      this.ingreso.fecha = ''
    }

    limpiarCamposE(){
      this.egreso.categoria = '',
      this.egreso.cantidad = '',
      this.egreso.fecha = ''
    }
    
}
