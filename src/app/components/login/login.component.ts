import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent  implements OnInit {

  constructor(private router:Router, private servicioLogin:LoginService) { }
  
  usuario={
    email:"",
    password:""
  };

  ngOnInit() {}

  inicioSesion(){
    this.servicioLogin.login(this.usuario).subscribe(
      res=>{
        alert("Inicio de sesión exitoso");
        localStorage.setItem("correo", res.env.email);
        localStorage.setItem("usuario", res.env.nombre);
        localStorage.setItem("token", res.env.jwtoken);
        //localStorage.setItem("perfil", res.env.tipo);
        this.router.navigate(['/inicio']);  
      },
      err=>{
        console.log(err);
      }
    );
    //this.router.navigate(['/inicio']);  
  }
  limpiar_campos(){
    this.usuario.password = "";
    this.usuario.email = "";   
  }

}
