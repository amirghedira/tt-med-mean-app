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
    onAddNurse() {
        this.adminService.addNurse(this.nurse)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Doctor successfully added!',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        this.resetNurse()
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
