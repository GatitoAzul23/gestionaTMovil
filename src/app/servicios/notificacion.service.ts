import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  //url = 'http://localhost:3000/notificacion';
  url = 'https://gestionatapirest.onrender.com/notificacion';

  constructor(
    private http : HttpClient
  ) { }

  registrar(notificacion: any){
    return  this.http.post<any>(this.url+"/nuevo", notificacion);
  }

  consultar(notificacion:any){
    return this.http.post<any>(this.url+"/consultarNot", notificacion);
  }

  eliminar(notificacion:any){
    return this.http.put<any>(this.url+"/eliminar", notificacion);
  }

}
