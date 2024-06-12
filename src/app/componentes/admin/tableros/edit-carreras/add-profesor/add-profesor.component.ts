import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorDTO, ProfesorDto } from 'src/app/interfaces/profesores';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';

@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.css']
})
export class AddProfesorComponent implements OnInit  {
  carreraId!: number; 
  excluirId: number[] = []; 

  profesores: ProfesorDTO[] = [];
  displayedColumnsProfesores: string[] = ["position", "nombre", "correo"]
  
  dataSourceProfesores = new MatTableDataSource(this.profesores);
  selection = new SelectionModel<ProfesorDTO>(true, [])
  selectedElements: ProfesorDTO[] = [];

  constructor(
    private _profesoresService: GetProfesoresService, 
    private _route: ActivatedRoute,
    private _profesoresCarreraPost: PostCarrerasService,
    private _errorService: HandleErrorService, 
    private _router: Router,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.carreraId = +JSON.parse(params['carreraId']); 
    })

    console.log(this.carreraId);
    this.getProfesoresDeCarrera(this.carreraId); 

    this.selection.changed.subscribe(() => {
      this.selectedElements = this.selection.selected; 
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceProfesores.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSourceProfesores.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProfesorDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  getProfesoresDeCarrera(id: number){
    this._profesoresService.getProfesorPorCarreraId(id).subscribe({
      next: (data: ProfesorDTO[]) => {
        this.profesores = data;
        this.profesores.forEach(element => {
          this.excluirId.push(element.profesorId);
        });
        console.log("Profesores excluidos: ") 
        console.log(this.excluirId);
      },
      error: (error: any) => console.log(error),
      complete: () => {
        console.log("Profesores por carrera cargado completamente");

        this.GetProfesores(this.excluirId)
      }
    })
  }

  GetProfesores(excluirId: number[]){
    this._profesoresService.getProfesoresExcluirById(excluirId).subscribe({
      next: (data: any) => {
        console.log(data);        
        this.profesores = data
        this.dataSourceProfesores = new MatTableDataSource(this.profesores)
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        console.log("Profesores cargados completamente")
      }
    })
  }

  addProfesores():void{
    console.log(this.selectedElements)

    let profesoresIds: number[] = []; 
    this.selectedElements.forEach((profesor: any) => {
      profesoresIds.push(profesor.id);
    })
    console.log(profesoresIds)

    this._profesoresCarreraPost.postProfesoresCarreras(this.carreraId, profesoresIds).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("Se ha completado la carga de profesores")
        this.back();
      }
    })
  }

  back():void{ 
    this._router.navigate([`admin/editar-carrera/${this.carreraId}`]);
  }
}
