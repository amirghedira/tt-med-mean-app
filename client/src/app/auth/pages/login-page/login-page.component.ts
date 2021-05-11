import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/User';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    username: string;
    password: string;
    errorMessage: string;
    currentUserSubscriber: Subscription;
    constructor(private authService: AuthService, private router: Router) { }
    ngOnDestroy(): void {
        this.currentUserSubscriber.unsubscribe()
    }

    ngOnInit() {
        this.currentUserSubscriber = this.authService.getCurrentUser()
            .subscribe((user: User) => {
                if (user) {
                    if (user.role === 'admin') {
                        this.router.navigate(['/admin'])

                    }
                }
            })
    }

    resetErrorMsg() {
        this.errorMessage = ''
    }

    onConnectUser() {
        this.authService.userLogin(this.username, this.password)
            .subscribe((data: any) => {
                this.authService.setCurrentUser(data.user)
                this.authService.setToken(data.accessToken)
                console.log(data)
                if (data.user.role === 'admin')
                    this.router.navigate(['/admin'])
            }, error => {
                this.errorMessage = 'Invalid username or password'
            })
    }

}
