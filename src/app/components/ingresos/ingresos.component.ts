import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {Chart, registerables} from 'chart.js';
import { IngresoService } from 'src/app/servicios/ingreso.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  standalone: false
})
export class IngresosComponent  implements OnInit {
  //agregado para las graficas
  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(private servicioIngresos:IngresoService, 
    private alertCtrl:AlertController) { }

  ngOnInit() {
    this.consultarMesNow();
  }

  //para la grafica
  chart:any;

  ingreso ={
    usuario:localStorage.getItem('correo')
  }

  ingresos:any;

  //Funcion para crear la grafica
  createChart(data: any) {
    Chart.register(...registerables);
    const labels = Object.keys(data);
    const values = Object.values(data);

    this.chart = new Chart('canvas', {
      type: 'doughnut', // Cambia a 'pie', 'line', etc. si lo deseas
      data: {
        labels: labels,
        datasets: [{
          label: 'Ingresos del mes',
          data: values,
          backgroundColor: [
            '#BE5A83',
            '#36A2EB',
            '#FFCF50',
            '#4F6F52',
            '#A94A4A',
            '#EF9C66',
            '#61A3BA'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }//fin de la función para crear la grafica

  //funcion para consultar los ingresos del mes actual
  consultarMesNow(){
    this.servicioIngresos.consultarMesAct(this.ingreso).subscribe(
      res=>{
        const data = res.totales;
        this.ingresos = res.ingresos;
        //console.log(res.ingresos);
        this.createChart(data);
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  } //fin de la funcion de consultarMes Actual

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

}
