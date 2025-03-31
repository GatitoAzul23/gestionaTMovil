import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //url = 'http://localhost:3000/usuarios';
  url = 'https://gestionatapirest.onrender.com/usuarios';

  constructor(private router:Router, private http:HttpClient) { }

  login(usuario:object){
    return this.http.post<any>(this.url+"/login", usuario);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  
  eslogueado():boolean{
    if(localStorage.getItem("usuario") != null){
        return true;
    }else{
      return false;
    }
  }

  cambiarContra(usuario: object){
    return this.http.put<any>(this.url +"/actualizar", usuario);
  }

  consultarUno(usuario: object){
    return this.http.post<any>(this.url+"/consultar", usuario);
  }

  tuperfil(){
    return localStorage.getItem("tipo");
  }

  registrar(usuario: object){
    return this.http.post<any>(this.url+"/registro", usuario);
  }

  agrCategorias(usuario: object){
    return this.http.put<any>(this.url+"/categorias", usuario);
  }

  categoriasFiltradas(usuario: object){
    return this.http.post<any>(this.url+"/verCate", usuario);
  }

  agregarIngreso(ingreso: any){
    return this.http.put<any>(this.url+"/nuevoIngreso",ingreso);
  } 

  agregarEgreso(egreso:any){
    return this.http.put<any>(this.url+"/nuevoEgreso",egreso);
  }

  eliminarIngreso(ingreso:any){
   const body={
    categoria: ingreso.categoria ,
    usuario: localStorage.getItem("correo")
   }
    return this.http.put<any>(this.url+"/eliminaIng", body);
  }

  eliminaEgreso(egreso:any){
    //return this.http.put<any>(this.url+"/nuevoEgreso",egreso);
    const body={
      categoria: egreso.categoria ,
      usuario: localStorage.getItem("correo")
    }
      return this.http.put<any>(this.url+"/eliminaEgr", body);
  }
}
