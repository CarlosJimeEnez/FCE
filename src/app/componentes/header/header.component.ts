import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUserService } from 'src/app/services/login-user.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  openAcademia = false; // Controla si se abre los dropdown 
  openOfertaAcademica = false; 
  openDifusion  = false;
  openNosotros = false;
  isLogged: boolean = false
  isMobile = window.innerWidth < 768; 

  constructor(
    private _router: Router,
    private _authService: LoginUserService, 
    private _snackBar: MatSnackBar,
  ) {}

  // Header visible
  lastScrollTop:number = 0;
  headerVisible: boolean = false;
  fragment: string = "licenciaturas"

  ngOnInit(): void {
    this._authService.isLoggedIn$.subscribe((data: boolean) => {
      this.isLogged = data;
      console.log("Is logged: " +  this.isLogged)
    });
    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
  }
  
  desplazarAInicio() {
    this._router.navigate([`/`], {fragment: 'inicio'});
  }

  desplazarALicenciaturas(): void {
    this._router.navigate([`/`], {fragment: 'licenciaturas'});
    console.log('licenciaturas')
  }

  logout(): void {
    this._authService.clearToken();
    this.alerta("Sesión cerrada")
  }
  
  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };
}