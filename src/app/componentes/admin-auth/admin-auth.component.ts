import { Component } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroments';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {
  constructor(private readonly google: GoogleAuthService){}

  ngOnInit(): void {
    
  }

  acceder(): void {
    this.google.initialize();
  }

  logOut(): void {
    this.google.signOut()
  }
}
