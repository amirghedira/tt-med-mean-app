import { Component, OnInit } from '@angular/core';
import { Nurse } from 'src/app/types/Nurse';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ajouter-infirmier',
    templateUrl: './ajouter-infirmier.component.html',
    styleUrls: ['./ajouter-infirmier.component.css']
})
export class AjouterInfirmierComponent implements OnInit {

    nurse: Nurse;
    errorMessage: string;
    rePassword: string;
    constructor(private adminService: AdminService) {
        this.resetNurse()
    }
    resetNurse() {
        this.nurse = {
            _id: null,
            matricule: 0,
            username: '',
            password: '',
            email: '',
            nom: '',
            prenom: '',
            role: 'nurse',
            numTel: '',
        }
        this.rePassword = ''
    }
    onResetMessage() {
        this.errorMessage = ''
    }
    onChangeMatricule(event) {
        if (event.target.value.length > 5)
            this.nurse.matricule = event.target.value.slice(0, 4)
    }
    onChangePhoneNumber(event) {
        if (event.target.value.length > 8)
            this.nurse.numTel = event.target.value.slice(0, 7)
    }
    onAddNurse() {
        if (this.nurse.matricule === 0 ||
            !this.nurse.email.trim().length ||
            !this.nurse.nom.trim().length ||
            !this.nurse.username.trim().length ||
            !this.nurse.prenom.trim().length ||
            !this.nurse.password.trim().length ||
            !this.rePassword.trim().length)
            return this.errorMessage = 'Please fill the whole inputs'
        if (this.nurse.numTel.toString().length !== 8)
            return this.errorMessage = 'invalid phone number'
        if (this.rePassword !== this.nurse.password)
            return this.errorMessage = 'Passwords didnt match';
        this.adminService.addNurse(this.nurse)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Nurse successfully added!',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        this.resetNurse()
                    }
                })
            }, err => {
                if (err.status === 400)
                    Swal.fire(
                        'Error',
                        'Nurse with this matricule already exists'
                    )
                else
                    Swal.fire(
                        'Error',
                        'Something went wrong!'
                    )
            })
    }
    ngOnInit() {
    }

}
