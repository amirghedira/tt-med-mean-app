import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/types/Admin';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    username: string;
    password: string;
    errorMessage: string;
    currentUserSubscriber: Subscription;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {

    }

    resetErrorMsg() {
        this.errorMessage = ''
    }

    onConnectUser() {
        this.authService.userLogin(this.username, this.password)
            .subscribe((data: any) => {
                this.authService.setCurrentUser(data.user)
                this.authService.setToken(data.accessToken)
                this.authService.isConnected.next(true)
            }, error => {
                this.errorMessage = 'Invalid username or password'
            })
    }

}
