import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
//import { PushNotifications } from '@capacitor/push-notifications';


//importar los modulos
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroComponent } from './components/registro/registro.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ModDatosComponent } from './components/mod-datos/mod-datos.component';
import { TipsComponent } from './components/tips/tips.component';
import { SuscripcionesComponent } from './components/suscripciones/suscripciones.component';
//servicios
import { LoginService } from './servicios/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DatosPersonalesComponent,
    InicioComponent,
    MenuComponent,
    NotificacionesComponent,
    ModDatosComponent,
    TipsComponent,
    SuscripcionesComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    //SwiperModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService,
    AlertController
   
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  bootstrap: [AppComponent],
})


export class AppModule {}
