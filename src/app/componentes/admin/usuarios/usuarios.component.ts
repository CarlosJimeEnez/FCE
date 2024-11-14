import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
  correoEliminar: number = 0

  constructor(
    private _router: Router,
    private _usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
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
    this.correoEliminar = id
    this.correo = correo
  }

  confirmacionEliminacion(){
    console.log("Eliminando usuario")
    this._usuariosService.deleteUsuarios(this.correoEliminar).subscribe({
      next: (data) => {
        console.log("Usuario eliminado")
        this.getUsuarios()
        
      },
      complete: () => {
        this.alerta("Usuario eliminado correctamente")
      },
      error: (error) => {
        console.log("Error al eliminar el usuario")
        this.alerta("Error al eliminar el usuario")
      }
    })
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };
}
