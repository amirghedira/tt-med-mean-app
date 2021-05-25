import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/types/Admin';
import { Nurse } from 'src/app/types/Nurse';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    userAdmin: Admin
    searchedMat: string;
    rePassword: string;
    oldPassword: string;
    newPassword: string;
    errorMessage: string;
    constructor(private authService: AuthService) {
    }
    ngOnInit() {
        this.authService.getCurrentUser()
            .subscribe((currentUser: Admin) => {
                this.userAdmin = { ...currentUser, password: '' }
            })
    }
    resetErrorMessage() {
        this.errorMessage = ''

    }

    onSaveUserInfo() {
        const updatedFields = [{ propName: 'username', value: this.userAdmin.username }, { propName: 'email', value: this.userAdmin.email }]
        this.authService.updateUserInfo(updatedFields)
            .subscribe((res: any) => {
                Swal.fire(
                    'Sucess',
                    'Profile successfully updated',
                    'success')

            }, err => {
                if (err.status === 409) {
                    Swal.fire(
                        'Error',
                        'Username or email already in use'
                    )

                } else {
                    Swal.fire(
                        'Error',
                        'Something went wrong!'
                    )
                }
            })

    }

    onSavePassword() {
        if (this.rePassword === this.newPassword) {
            this.authService.updateUserPassword(this.oldPassword, this.newPassword)
                .subscribe((res: any) => {
                    Swal.fire(
                        'Sucess',
                        'Password successfully updated',
                        'success')

                }, err => {
                    if (err.status === 409) {
                        Swal.fire(
                            'Error',
                            'Wrong old password'
                        )

                    } else {
                        Swal.fire(
                            'Error',
                            'Something went wrong!'
                        )
                    }
                })

        } else {
            this.errorMessage = 'Passwords didnt match'
        }

    }

}
