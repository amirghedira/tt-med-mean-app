import { Component, OnInit } from '@angular/core';
import { Nurse } from 'src/app/types/Nurse';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-ajouter-infirmier',
    templateUrl: './ajouter-infirmier.component.html',
    styleUrls: ['./ajouter-infirmier.component.css']
})
export class AjouterInfirmierComponent implements OnInit {

    nurse: Nurse;
    rePassword: string;
    constructor(private adminService: AdminService) {
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
    }

    onAddNurse() {
        this.adminService.addNurse(this.nurse)
            .subscribe(res => {
                console.log(res)
            }, err => {
                console.log(err)
            })
    }
    ngOnInit() {
    }

}
