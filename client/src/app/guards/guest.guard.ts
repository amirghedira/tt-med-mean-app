import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../types/User';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {
    constructor(private injector: Injector, private router: Router) {

    }
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let authService = this.injector.get(AuthService)
        let observerActivate = new Observable<boolean>((obs) => {
            authService.isConnected.subscribe((isConnected: Boolean) => {
                if (isConnected !== null) {
                    if (isConnected === true) {
                        authService.getCurrentUser()
                            .subscribe((user: User) => {
                                if (user.role == 'admin')
                                    this.router.navigate(['admin'])

                                else if (user.role == 'nurse')
                                    this.router.navigate(['nurse'])
                                else if (user.role == 'doctor')
                                    this.router.navigate(['doctor'])


                            })
                    }
                    obs.next(isConnected === false)

                }
            })
        })
        return observerActivate
    }

}
