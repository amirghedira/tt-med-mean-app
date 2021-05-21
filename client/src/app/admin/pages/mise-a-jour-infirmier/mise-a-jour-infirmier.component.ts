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
    errorMessage: string;
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
        this.rePassword = ''
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
    resetErrorMessage() {
        this.errorMessage = ''
    }
    onSearch() {

        this.adminService.getNurse(this.searchedMat)
            .subscribe((data: any) => {
                this.nurse = { ...data.nurse, password: '' }
            }, err => {
                if (err.status === 404) {
                    Swal.fire(
                        'Ouups',
                        'Nurse not found!'
                    )
                } else {
                    Swal.fire(
                        'Error',
                        'Something went wrong!'
                    )
                }
            })
    }
    onSave() {
        if (!this.nurse.username || !this.nurse.numTel)
            return this.errorMessage = 'Fill the whole inputs';

        if (this.rePassword !== this.nurse.password)
            return this.errorMessage = 'Passwords didnt match';
        this.adminService.updateNurse(this.nurse._id, this.nurse)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Nurse successfully updated!',
                    'success')
            }, err => {
                if (err.status === 409)
                    Swal.fire(
                        'Error',
                        'Username already in use'
                    )
                else
                    Swal.fire(
                        'Error',
                        'Something went wrong!'
                    )
            })
    }

}
