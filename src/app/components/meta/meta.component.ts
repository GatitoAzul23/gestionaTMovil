import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
  standalone: false
})
export class MetaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  meta = {
    usuario:localStorage.getItem('correo'),
    objetivo: '',
    costo:0,
    tiempo:0
  }

  calcular(){

  }

}
