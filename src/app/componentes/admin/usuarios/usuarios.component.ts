import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosDto } from 'src/app/interfaces/usuarios';
import { OffCanvasComponent } from '../off-canvas/off-canvas.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'

  
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuariosDto[] = []
  dataSource = new MatTableDataSource(this.usuarios)
  usuarioNoCargados: boolean = true;
  correo: string = ""

  constructor(
    private _router: Router,
    private _usuariosService: UsuariosService
  ){}

  displayedColumns: string[] = ["Correo", "Acciones"];

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(){
    this._usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data
        this.dataSource = new MatTableDataSource(this.usuarios)
        this.usuarioNoCargados = false
      }, 
      complete: () => {},
      error: (error) => {
        console.log("Error al obtener los usuarios")
      }
    })
  }

  applyFilter(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  nuevoUsuario(){
    this._router.navigate(["admin/nuevoUsuario"])
  }

  prepararEliminacion(id: number, correo: string){
    console.log("Preparando eliminacion")
  }

  confirmacionEliminacion(){
    console.log("Eliminando usuario")
  }
}
