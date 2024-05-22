import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsDto } from 'src/app/interfaces/Dto';

@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.css']
})
export class EditAdsComponent {
  id!: number;
  adNombre!: string;
  ad!: AdsDto

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  back():void{
    this._router.navigate(['admin/anuncios', {}])
  }
}
