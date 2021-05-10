import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/User';
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
    role: string;
    telecomPass: string;
    errorMessage: string;
    constructor(private userService: UserService, private router: Router) {
        this.role = 'admin'
    }

    ngOnInit() {
    }

    resetErrorMsg() {
        this.errorMessage = ''
    }
    onSignup() {

        if (this.password === this.rePassword) {
            const newUser: User = {
                _id: null,
                username: this.username,
                email: this.email,
                password: this.password,
                role: this.role
            }
            this.userService.createUser(newUser, this.telecomPass)
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
                }, () => {
                    this.errorMessage = 'Telecom password is wrong'
                })
        } else {
            this.errorMessage = 'Passwords didnt match'
        }
    }

}
