import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../types/User';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private injector: Injector, private router: Router) {

    }
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let authService = this.injector.get(AuthService)
        let observerActivate = new Observable<boolean>((obs) => {
            authService.getCurrentUser().subscribe((user: User) => {
                obs.next(user !== null)
                if (user === null)
                    this.router.navigate(['/auth/login'])
            })
        })
        return observerActivate
    }

}
