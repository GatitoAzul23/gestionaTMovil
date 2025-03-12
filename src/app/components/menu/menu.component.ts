import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
  //imports: [IonApp, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar],
})
export class MenuComponent  implements OnInit {

  constructor(private router:Router, private servicioLogin:LoginService) { }
//Variables para el uso del menu
  faBars = faBars;

  ngOnInit() {}

  
  public isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout(){
    this.servicioLogin.logout();
  }
}
