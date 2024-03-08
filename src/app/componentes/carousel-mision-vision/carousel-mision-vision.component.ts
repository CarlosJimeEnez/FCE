import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  isButtonEnabled: boolean = false;
  mostrarEnTelefono: boolean = false;
  isExpanded:boolean = false; 

  constructor(private el: ElementRef) {
    this.checkWindowSize();
  }

  // Verifica el tamaño al cargar
  checkWindowSize() {
    this.isButtonEnabled = window.innerWidth <= 768; // Habilita en teléfonos
  }

  expandArrow(){
    this.isExpanded = true;
  }
  expandLess(){
    this.isExpanded = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isButtonEnabled = event.target.innerWidth <= 768; // Ajusta según tu punto de quiebre
  }

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

    const modalElement = this.el.nativeElement.querySelector("#Vision"); 
    modalElement.addEventListener("hidden.bs.modal", () => {
      this.expandLess(); 
    })
    const modalElementMision = this.el.nativeElement.querySelector("#Mision"); 
    modalElementMision.addEventListener("hidden.bs.modal", () => {
      this.expandLess(); 
    })
    const modalElementEstrategicos = this.el.nativeElement.querySelector("#Estrategicos"); 
    modalElementEstrategicos.addEventListener("hidden.bs.modal", () => {
      this.expandLess(); 
    })
    const modalElementHumanos = this.el.nativeElement.querySelector("#Humanos"); 
    modalElementHumanos.addEventListener("hidden.bs.modal", () => {
      this.expandLess(); 
    })
  }
}
