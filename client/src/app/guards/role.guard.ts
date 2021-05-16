import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../types/User';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private injector: Injector) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let authService = this.injector.get(AuthService)

        let observerActivate = new Observable<boolean>((obs) => {

            authService.isConnected
                .subscribe(isConnected => {
                    if (isConnected !== null) {
                        authService.getCurrentUser().subscribe((user: User) => {
                            obs.next(user.role === next.data.role)
                        })
                    }
                })
        })
        return observerActivate
    }

}
