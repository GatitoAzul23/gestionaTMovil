import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/servicios/meta.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
  standalone: false
})
export class MetaComponent  implements OnInit {

  constructor(
    private servicioMeta: MetaService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.verFinalizados();
  }
  metas:any;

  metaMod = {
    cantidad: '',
    usuario: localStorage.getItem("correo")
  }

  meta = {
    usuario:localStorage.getItem('correo'),
    objetivo: '',
    costo:'',
    tiempo:''
  }

  metaSugerida ={
    usuario: localStorage.getItem("correo"),
    meta:'',
    montoObjetivo:'',
    mesesPlaneados:'',
    ahorroMensualRequerido:'',
    maxAhorroPermitido:'',
    viable: false,
    excedente:'',
    diferenciaFaltante:'',
    mesesMinimos:''
  }

  calcular(){
    this.servicioMeta.calcularMeta(this.meta).subscribe(
      res=>{
        console.log(res);
        this.setOpen(true);
        this.limpiarCampos();
        this.metaSugerida.viable = res.viable;
        this.metaSugerida.meta = res.meta;
        this.metaSugerida.montoObjetivo = res.montoObjetivo;
        this.metaSugerida.mesesPlaneados = res.mesesPlaneados;
        this.metaSugerida.ahorroMensualRequerido = res.ahorroMensualRequerido;
        this.metaSugerida.maxAhorroPermitido = res.maxAhorroPermitido;
        this.metaSugerida.excedente = res.excedente;
      },
      err=>{
        this.presentAlertError(err);
        this.limpiarCampos();
      }
    );
  }

  registrar(){
    this.servicioMeta.registrar(this.metaSugerida).subscribe(
      res=>{
        localStorage.setItem("meta", "true");
        this.presentAlert();
      },
      err=>{

      }
    );
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

  //TODO: Funcion para limpiar campos
  limpiarCampos(){
    this.meta.costo= '';
    this.meta.objetivo='';
    this.meta.tiempo='';
  } 
  
  limpiarCamposSug(){
    this.metaSugerida.meta='',
    this.metaSugerida.montoObjetivo='',
    this.metaSugerida.mesesPlaneados='',
    this.metaSugerida.ahorroMensualRequerido='',
    this.metaSugerida.maxAhorroPermitido='',
    this.metaSugerida.excedente='',
    this.metaSugerida.diferenciaFaltante='',
    this.metaSugerida.mesesMinimos=''
  }

  //TODO:Para el modal
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // async presentAlertError(err:any) {
  //   if(typeof(err.error)=="string"){
  //     const alert = await this.alertCtrl.create({
  //       header: 'Algo salio mal',
  //       message: err.error,
  //       buttons: ['Cerrar']
  //     });
  //     await alert.present();
  //   }
    
  // Modificar la condición
async presentAlertError(err: any) {
  let mensaje = '';

  if (err.error?.message) { // Primero verificar mensaje estructurado
    mensaje = err.error.message;
  } else if (typeof err.error === 'string') {
    mensaje = err.error;
  } else {
    mensaje = 'Tu ahorro mensual destinado a gastos opcionales está cubierto por otra meta';
  }

  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: mensaje,
    buttons: ['OK']
  });
  
  await alert.present();
}


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'GestionaT',
      message: 'Meta registrada correctamente.',
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

  //para hostirial
  isModalOpenHistorial = false;

  setOpenHistorial(isOpen: boolean) {
    this.isModalOpenHistorial = isOpen;
  }

}
