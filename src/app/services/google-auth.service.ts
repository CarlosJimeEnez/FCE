import { Injectable } from '@angular/core';
import { AuthConfig ,OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../enviroments/enviroments';

const oAuthConfig: AuthConfig = {
  issuer: "https://accounts.google.com",
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: "1005764740167-82n8jbbp42i12njamodbtjvlhfkqbgav.apps.googleusercontent.com",
  scope: "https://www.googleapis.com/auth/drive"
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private readonly _oAuthService: OAuthService) {}

  initialize() {
    // Configura OAuthService con oAuthConfig, etc.
    this._oAuthService.configure(oAuthConfig);
    this._oAuthService.loadDiscoveryDocument().then(() => {
      // Intenta iniciar sesión automáticamente con el flujo implícito
      this._oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this._oAuthService.hasValidAccessToken()) {
          // Solo inicia el flujo de inicio de sesión si no hay un token válido
          this._oAuthService.initLoginFlow();

        } else {
          this._oAuthService.loadUserProfile().then((userProfile) => {
            console.log('Perfil del usuario:', userProfile);
            const accessToken = this._oAuthService.getAccessToken()
            console.log(accessToken)
          });
        }
      });
    });
    
  }

  public signOut(): void{
    this._oAuthService.logOut()
  }

}
