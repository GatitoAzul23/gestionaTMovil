import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  standalone:false
})
export class NotificacionesComponent  implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  notificacion = {
    fecha: '',
    mensaje: '',
    frecuencia: ''
  }

  async programarNotificacion() {
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

    this.limpiarCampos();
    this.presentAlert();
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
      message: 'Notificación programada correctamente',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

}
