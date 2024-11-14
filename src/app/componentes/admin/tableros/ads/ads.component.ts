import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsDto } from 'src/app/interfaces/Dto';
import { AdsService } from 'src/app/services/ads/ads.service';
import { DeleteAdsService } from 'src/app/services/ads/delete-ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit {
  adNoCargadas: boolean = true;
  navNombre!: string
  eliminar: boolean = false;
  Ads: {ad: AdsDto, safeUrl: SafeResourceUrl}[] = [];
  adNombreAEliminar: string = "";
  selectedAdId: number = 0;

  dataSource = new MatTableDataSource(this.Ads)
  @ViewChild(MatTable) table!: MatTable<AdsDto>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router, 
    private _snackBar: MatSnackBar,
    private _adService: AdsService,
    private _sanitizer: DomSanitizer,
    private _deleteAd: DeleteAdsService
  ){
    this.navNombre = this._route.snapshot.queryParamMap.get('nombre')!;
  }

  displayedColumns: string[] = ["Nombre", "Imagenes","Acciones"]; 
  // dataSource = new MatTableDataSource(this.carreras)

  ngOnInit(): void {
    this.getAds()
  }

  // Funciones
  getAds() {
    this._adService.getAds().subscribe({
      next: (data: AdsDto[]) => {
        this.Ads = data.map(ad => {
          return {
            ad,
            safeUrl: this._sanitizer.bypassSecurityTrustResourceUrl(ad.file)
          }
        });
        
        this.dataSource = new MatTableDataSource(this.Ads)
      },
      error: (error: any) => {
        if(error.status == 404){
          console.log(`Error ${{error}}`)
          this.alerta(error.error)
        }
        console.log(error)
      },
      complete: () => {}
    })
  }

  applyFilter(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  editarAds(id: number, nombre: string): void{
    this._router.navigate([`admin/editar-ads/${id}`], { queryParams: {id: id, nombre: nombre} })
  }

  nuevoAds(){
    this._router.navigate(['admin/post-ads']);
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };

  eliminarAd(id: number): void {
    if(this.eliminar){
      this._deleteAd.deleteAd(id).subscribe({
        next: (data: any) => {
        },
        error: (data: any) => {
          this.alerta("Error en la petición")
        },
        complete: () => {
          this.alerta("Elemento eliminado")
          this.getAds();
        },
      });
    }
  }

  prepararEliminacion(id: number, nombre: string): void{
    this.selectedAdId = id;
    this.adNombreAEliminar = nombre;
  }

  confirmacionEliminacion(): void{
    this.eliminar = true;
    this.eliminarAd(this.selectedAdId)
  }

  postAd():void {
    this._router.navigate([`admin/post-ads`])
  }
}
