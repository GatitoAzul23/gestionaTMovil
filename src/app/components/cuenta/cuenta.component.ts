import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  standalone: false
})
export class CuentaComponent  implements OnInit {

  constructor(private servicioLogin:LoginService, private alertCtrl:AlertController) { }

  ngOnInit() {
    this.consultarUsuario();
  }

  usuario = {
    nomUsuario: '',
    password: '',
    password_ant: '',
    tipo: '',
    email: localStorage.getItem('correo')
  };

  actualizarContra(){
    
  }

  consultarUsuario(){
    this.servicioLogin.consultarUno(this.usuario).subscribe(
      res=>{
        this.usuario.nomUsuario = res.usu.nomUsuario;
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  async presentAlertError(error:any) {
    const alert = await this.alertCtrl.create({
      header: 'Algo salió mal',
      //message: ,
      buttons: ['Cerrar']
    });
    await alert.present();
  }//fin de presentAlertError

}
