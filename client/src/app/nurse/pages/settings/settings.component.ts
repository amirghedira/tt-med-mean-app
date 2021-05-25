import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Nurse } from 'src/app/types/Nurse';
import { User } from 'src/app/types/User';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    userNurse: Nurse
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
                this.userNurse = { ...currentUser, password: '' }
            })
    }
    resetErrorMessage() {
        this.errorMessage = ''

    }
    onChangePhoneNumber(event) {
        if (event.target.value.length > 8)
            this.userNurse.numTel = event.target.value.slice(0, 7)
    }
    onSaveUserInfo() {
        const updatedFields = [
            { propName: 'username', value: this.userNurse.username },
            { propName: 'email', value: this.userNurse.email },
            { propName: 'nom', value: this.userNurse.nom },
            { propName: 'prenom', value: this.userNurse.prenom },
            { propName: 'numTel', value: this.userNurse.numTel },

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
