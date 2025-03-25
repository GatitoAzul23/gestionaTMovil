import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { NotificacionService } from 'src/app/servicios/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  standalone:false
})
export class NotificacionesComponent  implements OnInit {

  constructor(private alertCtrl: AlertController,
    private servicioNotificacion: NotificacionService
  ) { }

  ngOnInit() {
    this.consultarNotificaciones();
  }

  notificaciones:any;
  notificacion = {
    fecha: '',
    mensaje: '',
    frecuencia: '',
    usuario: localStorage.getItem("correo")
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  consultarNotificaciones(){
    this.servicioNotificacion.consultar(this.notificacion).subscribe(
      res=>{
        this.notificaciones = res.notificacion;
      },
      err=>{

      }
    );
  }

  eliminar(notificacion: any){
    this.servicioNotificacion.eliminar(notificacion).subscribe(
      res=>{
        this.presentAlertElim();
        //location.reload();
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }


  programarNotificacion(){
    this.servicioNotificacion.registrar(this.notificacion).subscribe(
      res=>{
        this.presentAlert();
        this.agrendarNoti();
        this.limpiarCampos();
      },
      err=>{
        this.presentAlertError(err);
      }
      
    );
    

  }


  async agrendarNoti() {
    const scheduleDate = new Date(this.notificacion.fecha);
    
    await LocalNotifications.schedule({
      notifications: [{
        title: 'Recordatorio',
        body: this.notificacion.mensaje,
        id:this.generateUniqueId(),
        schedule: { 
          at: scheduleDate 
        },
        sound: 'default',
        smallIcon: 'ic_stat_icon',
        //vibrate: true
      }]
    });

    
   }

  // async programarNotificacion() {
  //   const userDate = new Date(this.notificacion.fecha);
    
  //   // Extraer componentes de fecha/hora
  //   const startYear = userDate.getFullYear();
  //   const startMonth = userDate.getMonth();
  //   const startDay = userDate.getDate();
  //   const hour = userDate.getHours();
  //   const minute = userDate.getMinutes();

  //   enum ScheduleEvery {
  //     MINUTE = 'minute',
  //     HOUR = 'hour',
  //     DAY = 'day',
  //   }
    
  //   // Mapeo de frecuencia
  //   function mapFrecuencia(frecuencia: string): ScheduleEvery | undefined {
  //     switch (frecuencia) {
  //       case 'minuto':
  //         return ScheduleEvery.MINUTE;
  //       case 'hora':
  //         return ScheduleEvery.HOUR;
  //       case 'día':
  //         return ScheduleEvery.DAY;
  //       default:
  //         return undefined;
  //     }
  //   }
  
  //   await LocalNotifications.schedule({
  //     notifications: [{
  //       title: 'Recordatorio recurrente',
  //       body: this.notificacion.mensaje,
  //       id: this.generateUniqueId(),
  //       schedule: {
  //         every: mapFrecuencia(this.notificacion.frecuencia), // Frecuencia: 'minute', 'hour', 'day', 'week', etc.
  //           on: {
  //           hour: hour,
  //           minute: minute
  //           },
  //           repeats: true,
  //           at: new Date(startYear, startMonth, startDay, hour, minute) // Fecha y hora inicial
  //       },
  //       smallIcon: 'ic_stat_icon'
  //     }]
  //   });

  //   this.limpiarCampos();
  //   //alert('Notificación programada correctamente');  
  //   this.presentAlert();
  // }//fin de la funcion programarNotificacion

  generateUniqueId(): number {
    return new Date().getTime() % 1000000;
  }//fin de la funcion generateUniqueId
  
  limpiarCampos(){
    this.notificacion.fecha = '';
    this.notificacion.mensaje = '';
    this.notificacion.frecuencia = '';
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Recordatorio programaoa correctamente',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async presentAlertElim() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Recordatorio eliminado correctamente',
      //buttons: ['Cerrar']
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            location.reload();
            return true; // Permite que la alerta se cierre
          }
        }
      ]
    });
    await alert.present();
    //location.reload();
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
}
