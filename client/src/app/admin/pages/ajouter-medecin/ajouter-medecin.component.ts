import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/types/Doctor';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-ajouter-medecin',
    templateUrl: './ajouter-medecin.component.html',
    styleUrls: ['./ajouter-medecin.component.css']
})
export class AjouterMedecinComponent implements OnInit {


    doctor: Doctor;
    rePassword: string;
    errorMessage: string;
    constructor(private adminService: AdminService) {
        this.resetDoctor()
    }

    resetDoctor() {
        this.doctor = {
            _id: null,
            matricule: 0,
            username: '',
            password: '',
            email: '',
            nom: '',
            prenom: '',
            role: 'doctor',
            numTel: '',
            workingHours: []
        }
        this.rePassword = ''
    }
    onChangeMatricule(event) {
        if (event.target.value.length > 8)
            this.doctor.matricule = event.target.value.slice(0, 7)
    }
    onChangePhoneNumber(event) {
        if (event.target.value.length > 8)
            this.doctor.numTel = event.target.value.slice(0, 7)
    }
    onResetMessage() {
        this.errorMessage = ''
    }
    onAddDoctor() {
        if (this.doctor.matricule === 0 ||
            !this.doctor.email.trim().length ||
            !this.doctor.nom.trim().length ||
            !this.doctor.username.trim().length ||
            !this.doctor.prenom.trim().length ||
            !this.doctor.password.trim().length ||
            !this.rePassword.trim().length)
            return this.errorMessage = 'Please fill the whole inputs'
        if (this.doctor.numTel.toString().length !== 8)
            return this.errorMessage = 'invalid phone number'
        if (this.rePassword !== this.doctor.password)
            return this.errorMessage = 'Passwords didnt match';
        this.adminService.addDoctor(this.doctor)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Doctor successfully added!',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        this.resetDoctor()
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
