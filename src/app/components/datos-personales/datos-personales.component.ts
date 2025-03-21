import { Component, OnInit } from '@angular/core';
import { IonCheckbox } from '@ionic/angular/standalone';
import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
  standalone:false
})
export class DatosPersonalesComponent  implements OnInit {
  //para los iconos
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(
    private router:Router, 
    private menu:MenuController, 
    private servicioLogin:LoginService, 
    private alertCtrl:AlertController) { }

  ngOnInit() {}
  categoriasSeleccionadas: any[] = [];

  categorias: any[] = []; // Para las categorías personalizadas
  categoriaNombre = ''; // Para el nombre de la categoría personalizada
 
  
  egreso ={
    categoria : "",
    estatus: "Activo"
  }

  

  ingreso={
    categoria:"", 
    cantidad:"", 
    frecuencia:"", 
    estatus: "Activo"
  }

  usuario ={
    email: localStorage.getItem("correo"),
    categoriasIngreso :this.ingreso,
    categoriasEgreso :this.categoriasSeleccionadas
    
  }
  //funciones
  aceptar(){
    this.servicioLogin.agrCategorias(this.usuario).subscribe(
      res=>{
        
        this.presentAlert();
        this.router.navigate(['/inicio']);
      },
      err=>{

        this.presentAlertError(err);
        console.log(err.error);
        console.log()
      }
    );
    
  }

  actualizarCategoria(nombre: string, checked: boolean) {
    if (checked) {
      // Agregar categoría al arreglo
      this.categoriasSeleccionadas.push({ categoria: nombre, estatus: 'Activo' });
    } else {
      // Eliminar categoría del arreglo
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c.categoria !== nombre);
    }
  }

  agregarCategoria() {
    if (this.categoriaNombre) {
      this.categorias.push({ nombre: this.categoriaNombre });
      this.categoriaNombre = '';
    }
  }


  limpiarCampos(){

  }





  //funciones para los alerts
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
      message: error,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

}
