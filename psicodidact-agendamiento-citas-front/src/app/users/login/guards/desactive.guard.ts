import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DesactiveGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
    if (this.authService.campo && !this.authService.isAuthenticated()) {
      return true;
    }

  //  if (!this.authService.campo) {
    //this.authService.logout();
    //this.router.navigate(['/']);
    //}

   
  
     return false;
  }
  
}
