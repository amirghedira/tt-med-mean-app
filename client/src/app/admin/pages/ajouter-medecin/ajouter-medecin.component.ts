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
        }
        this.rePassword = ''
    }
    onAddDoctor() {
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
                Swal.fire(
                    'Error',
                    'Something went wrong!'
                )
            })
    }
    ngOnInit() {
    }

}
