import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/User';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    username: string;
    password: string;
    errorMessage: string;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    resetErrorMsg() {
        this.errorMessage = ''
    }

    onConnectUser() {
        this.authService.userLogin(this.username, this.password)
            .subscribe((data: any) => {
                console.log(data.user)
                this.authService.setCurrentUser(data.user)
                this.authService.setToken(data.accessToken)
                this.router.navigate(['home'])
            }, error => {
                this.errorMessage = 'Invalid username or password'
            })
    }

}
