import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private http: HttpClient) { }

  //url = 'http://localhost:3000/egresos';
  url = 'https://gestionatapirest.onrender.com/egresos';

  registrar(egreso: object){
    return this.http.post<any>(this.url+"/egreso", egreso)
  }

  consultarMesAct(egreso:object){
    return this.http.post<any>(this.url+"/consultarMesAct", egreso)
  }

}
