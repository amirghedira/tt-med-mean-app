import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/types/Admin';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

    username: string;
    email: string;
    password: string;
    rePassword: string;
    telecomPass: string;
    errorMessage: string;
    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    resetErrorMsg() {
        this.errorMessage = ''
    }

    validateEmail(mail) {
        return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    }
    onSignup() {
        if (!this.email || !this.username || !this.password || !this.rePassword || !this.telecomPass)
            return this.errorMessage = 'Fill the whole inputs'
        if (!this.validateEmail(this.email))
            return this.errorMessage = 'Invalid email'

        if (this.password !== this.rePassword)
            return this.errorMessage = 'Passwords didnt match'

        const newUser: Admin = {
            _id: null,
            username: this.username,
            email: this.email,
            password: this.password,
            role: 'admin'
        }
        this.authService.createUser(newUser, this.telecomPass)
            .subscribe(() => {
                Swal.fire(
                    'Sucess',
                    'Your account has been created!',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        this.router.navigate(['login']);
                    }
                })
            }, (err) => {
                if (err.status === 400)
                    this.errorMessage = 'Telecom password is wrong'
                else if (err.status === 409)
                    this.errorMessage = 'username or email already in use'
                else
                    this.errorMessage = 'Connexion error'

            })
    }

}
