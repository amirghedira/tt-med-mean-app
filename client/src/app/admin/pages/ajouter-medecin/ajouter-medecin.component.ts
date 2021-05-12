import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/types/Doctor';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-ajouter-medecin',
    templateUrl: './ajouter-medecin.component.html',
    styleUrls: ['./ajouter-medecin.component.css']
})
export class AjouterMedecinComponent implements OnInit {


    doctor: Doctor;
    rePassword: string;
    constructor(private adminService: AdminService) {
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
    }


    onAddDoctor() {
        this.adminService.addNurse(this.doctor)
            .subscribe(res => {
                console.log(res)
            }, err => {
                console.log(err)
            })
    }
    ngOnInit() {
    }

}
