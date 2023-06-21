import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) { }
  
  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true
    } else {
      this.toast.error({detail: "ERRO!", summary: "Faça o Login para acessar o sistema!"});
      this.router.navigate(['login'])
      return false
    }
  }
}


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// }
