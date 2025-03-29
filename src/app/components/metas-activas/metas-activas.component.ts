import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { MetaService } from 'src/app/servicios/meta.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-metas-activas',
  templateUrl: './metas-activas.component.html',
  styleUrls: ['./metas-activas.component.scss'],
  standalone :false
})
export class MetasActivasComponent  implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;


  constructor(
    private servicioMeta: MetaService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.consultar();
    this.verFinalizados();
  }

  chart:any;
  metas:any;
  meta = {
    mesesPlaneados: '',
    meta : '',
    montoObjetivo:' ',
    ahorroMensualRequerido: '',
    usuario: localStorage.getItem("correo"),

    //cantidadAlcanzada: '',
    cantidadFaltante: '',
    
  }

  metaMod = {
    cantidad: '',
    usuario: localStorage.getItem("correo")
  }

  consultar(){
    this.servicioMeta.consultar(this.meta).subscribe(
      res=>{
        const data = res.totales;
        this.meta.meta =res.meta.meta ;
        this.meta.mesesPlaneados = res.meta.mesesPlaneados ;
        this.meta.montoObjetivo = res.meta.montoObjetivo;
        this.meta.ahorroMensualRequerido = res.meta.ahorroMensualRequerido;
        this.meta.cantidadFaltante = res.totales.Faltante;
        this.metaMod.cantidad = res.meta.ahorroMensualRequerido;
        //console.log(res.totales);
        this.createChart(data);
      },
      err=>{

      }
    );
  }

  modificar(){
    this.servicioMeta.modificar(this.metaMod).subscribe(
      res=>{
        this.presentAlert();
      }, 
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  terminar(){
    this.servicioMeta.finalizar(this.metaMod).subscribe(
      res=>{
        localStorage.setItem("meta", "false");
        this.presentAlertCancelar();
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  finalizar(){
    let alcance = parseFloat(this.meta.cantidadFaltante);
    console.log(alcance);
    if(alcance> 0){
      this.presentAlertAbandonar();
    }else{
      this.terminar();
      //alert ("La cantidad ya se cubrio");
    }
  }

  verFinalizados(){
    this.servicioMeta.verFinalizados(this.metaMod).subscribe(
      res=>{
        
        this.metas = res.finalizados;
      },
      err=>{
        this.presentAlertError(err);
      }
    );
  }

  limpiarCampos(){
    this.metaMod.cantidad = ''
  }

  async presentAlertCancelar() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Meta finalizada correctamente',
      //buttons: ['Cerrar']
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            this.router.navigate(['/inicio']);
            return true; // Permite que la alerta se cierre
          }
        }]
    });
    await alert.present();
  }


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Ahorro registrado correctamente',
      //buttons: ['Cerrar']
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            // Lógica para borrar los campos
            location.reload();
            this.limpiarCampos();
            return true; // Permite que la alerta se cierre
          }
        }]
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

  async presentAlertAbandonar() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'No haz alcanzado tu meta aún, ¿estas seguro de abandonar?',
      //buttons: ['Cerrar']
      buttons: [
        {
          text: 'Regresar',
          handler: () => {
            // Lógica para borrar los campos
            location.reload();
            this.limpiarCampos();
            return true; // Permite que la alerta se cierre
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.terminar();
            return true; // Permite que la alerta se cierre
          }
        }
      ]
    });
    await alert.present();
  }

  createChart(data: any) {
    Chart.register(...registerables);

    // Datos de ejemplo (ajusta según tus necesidades)
    const ahorrado = data.Progreso; // Valor de lo ahorrado
    const falta = data.Faltante;    // Valor de lo que falta

    this.chart = new Chart('metaGrafica', {
      type: 'bar', // Usar tipo 'bar' para gráfica de barras
      data: {
        labels: [''], // Etiqueta de la barra
        datasets: [
          {
            label: 'Ahorrado',
            data: [ahorrado],
            backgroundColor: '#4F6F52', // Color para lo ahorrado
            borderWidth: 1
          },
          {
            label: 'Falta',
            data: [falta],
            backgroundColor: '#BF3131', // Color para lo que falta
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'y', // Hacer la barra horizontal
        scales: {
          x: {
            stacked: true, // Apilar las barras en el eje X
            beginAtZero: true
          },
          y: {
            stacked: true // Apilar las barras en el eje Y
          }
        },
        responsive: true, // Asegurar que la gráfica sea responsive
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Progreso de la meta', // Texto del título
            position: 'bottom', // Posición del título (debajo del gráfico)
            font: {
              size: 16 // Tamaño de la fuente del título
            }
          }
        }
      }
    });
  } // Fin de la función para crear la gráfica

  //Para los modales
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  //para hostirial
  isModalOpenHistorial = false;

  setOpenHistorial(isOpen: boolean) {
    this.isModalOpenHistorial = isOpen;
  }
}
