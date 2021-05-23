import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    username: string;
    password: string;
    errorMessage: string;
    currentUserSubscriber: Subscription;
    constructor(private authService: AuthService) { }
    resetErrorMsg() {
        this.errorMessage = ''
    }

    onConnectUser() {
        this.authService.userLogin(this.username, this.password)
            .subscribe((res: any) => {
                this.authService.setCurrentUser(res.user)
                this.authService.setToken(res.accessToken)
                this.authService.isConnected.next(true)
            }, error => {
                this.errorMessage = 'Invalid username or password'
            })
    }

}
