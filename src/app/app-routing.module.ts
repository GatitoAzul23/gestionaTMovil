import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ModDatosComponent } from './components/mod-datos/mod-datos.component';
import { TipsComponent } from './components/tips/tips.component';
import { SuscripcionesComponent } from './components/suscripciones/suscripciones.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { EgresosComponent } from './components/egresos/egresos.component';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'datos/registro', component:DatosPersonalesComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'notificaciones', component:NotificacionesComponent},
  {path: 'modificar', component:ModDatosComponent},
  {path: 'tips', component:TipsComponent},
  {path: 'suscripciones', component:SuscripcionesComponent},
  {path: 'cuenta', component:CuentaComponent},
  {path: 'ingresos', component:IngresosComponent},
  {path: 'egresos', component:EgresosComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
