import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/types/Admin';
import { Doctor } from 'src/app/types/Doctor';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    userDoctor: Doctor
    searchedMat: string;
    rePassword: string;
    oldPassword: string;
    newPassword: string;
    errorMessage: string;
    constructor(private authService: AuthService) {
    }
    ngOnInit() {
        this.authService.getCurrentUser()
            .subscribe((currentUser: any) => {
                this.userDoctor = { ...currentUser, password: '' }
            })
    }
    resetErrorMessage() {
        this.errorMessage = ''

    }
    onChangePhoneNumber(event) {
        if (event.target.value.length > 8)
            this.userDoctor.numTel = event.target.value.slice(0, 7)
    }

    onSaveUserInfo() {
        const updatedFields = [
            { propName: 'username', value: this.userDoctor.username },
            { propName: 'email', value: this.userDoctor.email },
            { propName: 'nom', value: this.userDoctor.nom },
            { propName: 'prenom', value: this.userDoctor.prenom },
            { propName: 'numTel', value: this.userDoctor.numTel },

        ]
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
