import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private router:Router, private http: HttpClient) { }
  //url = 'http://localhost:3000/ingresos';
  url = 'https://gestionatapirest.onrender.com/ingresos';


  registrar(ingreso:object){
    return this.http.post<any>(this.url+"/ingreso", ingreso);
  }

  consultarMesAct(ingreso:object){
    return this.http.post<any>(this.url+"/consultar", ingreso);
  }

}
