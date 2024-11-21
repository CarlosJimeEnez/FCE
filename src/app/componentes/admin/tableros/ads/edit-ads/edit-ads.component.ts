import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsDto, AdsEditDto } from 'src/app/interfaces/Dto';
import { PutAdsService } from 'src/app/services/ads/put-ads.service';

@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.css']
})
export class EditAdsComponent {
  id!: string | null;
  ad: AdsEditDto = {
    nombreArchivo: "",
    link: "",
    file: null
  }
  editForm!: FormGroup

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _editAd: PutAdsService,
    private _snackBar: MatSnackBar
  ){
  }

  ngOnInit():void {
    this.id = this._route.snapshot.queryParamMap.get('id');
    
    this.ad.nombreArchivo = this._route.snapshot.queryParamMap.get('nombre')!;
    this.ad.id = +this.id!;
    this.editForm = this._fb.group({  
      nombre: [this.ad.nombreArchivo, Validators.required],
      link: [this.ad.link, Validators.required],
    });
  }

  editAd():void {
    this.ad.nombreArchivo = this.editForm.get('nombre')?.value; 
    this.ad.link = this.editForm.get('link')?.value;
    
    this._editAd.editAd(this.ad).subscribe({
      next: (data: any) => {
      },
      error: (err: any) => {
        this.alerta("Error en la petición")
      },
      complete: () => {
        this.alerta("Petición Exitosa")
        this.back();
      },
    })
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    });
  }

  back():void{
    this._router.navigate(['admin/anuncios', {}])
  }
}
