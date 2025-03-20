import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Swiper} from 'swiper';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
  standalone: false
})
export class TipsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  miArray: any[] = []; 
  @ViewChild('swiper') swiperRef!: ElementRef;
  
  swiper?: Swiper;

  ngAfterViewInit() {
    if (this.swiperRef) {
      this.swiper = new Swiper(this.swiperRef.nativeElement, {
        // Configuraciones de Swiper
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }

}
