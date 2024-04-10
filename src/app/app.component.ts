import { Component, HostListener, OnInit, OnDestroy} from '@angular/core';
import { GoogleAuthService } from './services/google-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FCE';
  
  constructor(){}

  ngOnInit(): void {
    
  }
}
