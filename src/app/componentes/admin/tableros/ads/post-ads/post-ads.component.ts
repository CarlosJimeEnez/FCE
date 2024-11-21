import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdsDtoFile } from 'src/app/interfaces/Dto';
import { PostAdsService } from 'src/app/services/ads/post-ads.service';

@Component({
  selector: 'app-post-ads',
  templateUrl: './post-ads.component.html',
  styleUrls: ['./post-ads.component.css']
})
export class PostAdsComponent implements OnInit  {
  postForm!: FormGroup
  ad: AdsDtoFile = {
    nombreArchivo: "",
    link: "",
    file: null as any
  }

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _fb: FormBuilder,
    private _postAd: PostAdsService
  ){}

  ngOnInit(): void {
      this.postForm = this._fb.group({
        nombre: ['', Validators.required],
        link: ['', Validators.required],
        archivo: ['', Validators.required]
      });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.ad.file = file;
    }
  }

  postAd(): void {
    const formData = new FormData();

    this.ad.nombreArchivo = this.postForm.get("nombre")?.value
    this.ad.link = this.postForm.get("link")?.value
    
    formData.append("nombreArchivo", this.ad.nombreArchivo)
    formData.append("link", this.ad.link)
    formData.append("file", this.ad.file)

    this._postAd.postAd(formData).subscribe({
      next: (data: any) => {
      },
      error: (data: HttpErrorResponse) => {
        console.error(`Error en la petición: ${data.message}`);
        this.alerta("Error en la petición")
      },
      complete: () => {
        this.alerta("Petición Exitosa")
        this.back();
      }
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
    this._router.navigate(['admin/anuncios'])
  }
}
