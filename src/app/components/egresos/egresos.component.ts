import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { EgresoService } from 'src/app/servicios/egreso.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.scss'],
  standalone: false
})
export class EgresosComponent  implements OnInit {

  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(
    private router: Router,
    private servicioLogin:LoginService,
    private servicioEgreso: EgresoService,
    private alertCtrl:AlertController
  ) { }

  chart:any;

  egreso= {
    usuario: localStorage.getItem("correo")
  }

  egresos : any;
  

  ngOnInit() {
    this.consultar();
  }

  consultar(){
    this.servicioEgreso.consultarMesAct(this.egreso).subscribe(
      res=>{
        const data = res.totales;
        this.egresos = res.egresos;
        this.createChart(data);
      },
      err=>{

      }
    );
  }

  //funcion para crear la grafica
  createChart(data: any) {
    Chart.register(...registerables);
    const labels = Object.keys(data);
    const values = Object.values(data);

    this.chart = new Chart('cavasEgr', {
      type: 'doughnut', 
      data: {
        labels: labels,
        datasets: [{
          label: 'Egresos del mes',
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


}
