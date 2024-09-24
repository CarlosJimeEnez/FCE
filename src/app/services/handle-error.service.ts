import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private _snackBar: MatSnackBar) { }

  HandleError(err: HttpErrorResponse){
    this.alerta("Error al enviar el documento");
    console.log(err.error);
    if(err.error.errors){
      for(const key in err.error.errors){
        if (err.error.errors.hasOwnProperty(key)) {
          console.error(`${key}: ${err.error.errors[key]}`);
        }
      }
    }
  }
  
  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    });
  }
  
}
