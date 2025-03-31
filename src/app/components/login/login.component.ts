import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent  implements OnInit {

  constructor(private router:Router, private servicioLogin:LoginService, private alertCtrl: AlertController) { }
  
  usuario={
    email:"",
    password:""
  };

  ngOnInit() {}

  inicioSesion(){
    this.servicioLogin.login(this.usuario).subscribe(
      res=>{
        localStorage.setItem("correo", res.env.email);
        localStorage.setItem("usuario", res.env.nomUsuario);
        localStorage.setItem("token", res.env.jwtoken);
        localStorage.setItem("tipo", res.env.tipo);
        this.presentAlert(res.env.nomUsuario);
        console.log(res);
        //localStorage.setItem("perfil", res.env.ti
        // cpo);
        //this.router.navigate(['/inicio']);  
        this.router.navigate(['/inicio']).then(() => {
          window.location.href = window.location.origin + '/inicio';
        });
        
      },
      err=>{
        //console.log(err);
        this.presentAlertError(err.error);
      }
    );
    //this.router.navigate(['/inicio']);  
  }
  limpiar_campos(){
    this.usuario.password = "";
    this.usuario.email = "";   
  }

  async presentAlert(usuario:any) {
    const alert = await this.alertCtrl.create({
      header: 'Inicio de sesión exitoso',
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
