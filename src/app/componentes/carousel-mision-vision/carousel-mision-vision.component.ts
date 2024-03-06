import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-carousel-mision-vision',
  templateUrl: './carousel-mision-vision.component.html',
  styleUrls: ['./carousel-mision-vision.component.css'],
  animations: [
    trigger('deslizar', [
      state('fuera', style({opacity: 0,transform: "translateX(-100%)"})),
      state('dentro', style({opacity: 1, transform: 'translateX(0%)'})),
      transition("fuera => dentro", [
        animate("0.5s ease-in")
      ]),
      transition('dentro => fuera', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class CarouselMisionVisionComponent implements OnInit {
  @ViewChild('miDiv') miDiv!: ElementRef;
  estadoAnimacion: string = 'fuera';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // this.estadoAnimacion = entry.isIntersecting ? 'dentro' : 'fuera';
        if (entry.isIntersecting && this.estadoAnimacion !== 'dentro') {
          this.estadoAnimacion = 'dentro';
        }
      });
    }, { threshold: [0.5] }); // Puedes ajustar el umbral según tus necesidades

    observer.observe(this.el.nativeElement);
  }
}
