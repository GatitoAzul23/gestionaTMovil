import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss',],
  standalone:false
})
export class RegistroComponent  implements OnInit {

  constructor(private router: Router, private servicioLogin:LoginService, private alertCtrl: AlertController) { }

  ngOnInit() {}
  usuario={
    email:"",
    password:"",
    nomUsuario:"",
    password_comprobar:""
  };

  registro(){
    console.log(this.usuario);
    this.servicioLogin.registrar(this.usuario).subscribe(
      res=>{
        localStorage.setItem("correo", res.usuaNuevo.email);
        localStorage.setItem("usuario", res.usuaNuevo.nomUsuario);
        localStorage.setItem("token", res.usuaNuevo.jwtoken);
        localStorage.setItem("tipo", res.usuaNuevo.tipo);
        this.presentAlert(this.usuario.nomUsuario);
        this.router.navigate(['/datos/registro']);
      },
      err=>{
        this.presentAlertError(err.error.error);
      }
    );
  }

  registro2(){
    this.router.navigate(['/datos/registro']);
  }

  async presentAlert(usuario:any) {
    const alert = await this.alertCtrl.create({
      header: 'Registro exitoso',
      message: 'Bienvenido '+ usuario,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async presentAlertError(error:any) {
    const alert = await this.alertCtrl.create({
      header: 'Algo salió mal',
      message: error,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

}
