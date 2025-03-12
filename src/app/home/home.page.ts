import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor( private router:Router, private servicioLogin:LoginService) {}
  
  comenzar(){
    if(this.servicioLogin.eslogueado()==true){
      this.router.navigate(['/inicio']);
      }else{
        this.router.navigate(['/login']);
      }

}
}
