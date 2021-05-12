import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Admin } from '../types/Admin';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let observerActivate = new Observable<boolean>((obs) => {
            this.authService.getCurrentUser().subscribe((user: Admin) => {

                obs.next(user !== null && user.role === next.data.role)
            })
        })
        return observerActivate
    }

}
