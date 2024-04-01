import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private triggerScrollTo = new Subject<string | null>(); 
  private triggerBackToMainMenu = new Subject<void>();

  trigerScrollTo$ = this.triggerScrollTo.asObservable();
  triggerBackToMainMenu$ = this.triggerBackToMainMenu.asObservable()

  constructor(private _router: Router) { }

  public scrollToFragment(fragment: string | null) {
    this.triggerScrollTo.next(fragment);
  }

  public back_to_main_menu():void{
    this._router.navigate([`/`])
  }

  public backToMainMenu():void {
    this.triggerBackToMainMenu.next()
  }
}
