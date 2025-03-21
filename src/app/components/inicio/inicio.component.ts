import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { IngresoService } from 'src/app/servicios/ingreso.service';
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
    private router:Router) { }
  

  ngOnInit() {
    this.consultarUno();
  }
  
  egreso ={
    categoria: '',
    cantidad: 0,
    fecha: '',
  }

  ingreso ={
    categoria: '',
    cantidad: 0,
    fecha: '',
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

    registrar(){
      
    }

    consultarUno(){
      this.servicioLogin.consultarUno(this.usuario).subscribe(
        res=>{
          this.usuario.saldo = res.usu.saldo;
          this.egresos = res.usu.categoriasEgreso;
          this.ingresos = res.usu.categoriasIngreso;
          console.log(this.egresos);
          console.log(this.ingresos);
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
          this.presentAlert();
          this.limpiarCampos();
          this.router.navigate(['/ingresos']);
        },
        err=>{
          this.presentAlertError(err.message);
        }
      );
    }

    async presentAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Exito',
        message: 'Información guardada correctamente',
        buttons: ['Cerrar']
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
      this.ingreso.categoria = '';
      this.ingreso.cantidad = 0;
      this.ingreso.fecha = '';
    }
    
}
