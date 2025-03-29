import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private http: HttpClient
  ) { }

  url = 'http://localhost:3000/metas';
  //url = 'https://gestionatapirest.onrender.com/metas';

  calcularMeta(meta:any){
    const body ={
      usuario : localStorage.getItem("correo"),
      meta: meta
    }
    return this.http.post<any>(this.url+"/calcular", body);
  }

  registrar(meta:any){
    return this.http.post<any>(this.url+"/registrar", meta);
  }

  consultar(meta: any){
    return this.http.post<any>(this.url+"/consultar", meta);
  }

  modificar(meta:any){
    return this.http.put<any>(this.url+"/modificar", meta);
  }

  verFinalizados(meta:any){
    return this.http.post<any>(this.url+"/finalizados", meta);
  }

  finalizar(meta: any){
    return this.http.put<any>(this.url+"/terminar", meta);
  }
}
