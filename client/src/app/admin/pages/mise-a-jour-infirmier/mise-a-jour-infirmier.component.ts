import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nurse } from 'src/app/types/Nurse';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-mise-a-jour-infirmier',
    templateUrl: './mise-a-jour-infirmier.component.html',
    styleUrls: ['./mise-a-jour-infirmier.component.css']
})
export class MiseAJourInfirmierComponent implements OnInit {

    nurse: Nurse
    searchedMat: string;
    rePassword: string;
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
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
    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params.matricule) {
                    this.adminService.getNurse(params.matricule)
                        .subscribe((data: any) => {
                            this.nurse = { ...data.nurse, password: '' }
                            this.searchedMat = data.nurse.matricule
                        }, err => {
                            this.router.navigate(['/admin/update-infirmier'])

                        })
                }
            })
    }
    onSearch() {
        this.adminService.getNurse(this.searchedMat)
            .subscribe((data: any) => {
                this.nurse = { ...data.nurse, password: '' }
            })
    }
    onSave() {
        this.adminService.updateNurse(this.nurse._id, this.nurse)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Agent successfully added!',
                    'success')
            }, err => {
                Swal.fire(
                    'Error',
                    'Something went wrong!'
                )
            })
    }

}
