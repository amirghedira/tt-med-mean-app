import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/types/Doctor';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-mise-a-jour-medecin',
    templateUrl: './mise-a-jour-medecin.component.html',
    styleUrls: ['./mise-a-jour-medecin.component.css']
})
export class MiseAJourMedecinComponent implements OnInit {

    doctor: Doctor
    searchedMat: string;
    rePassword: string;
    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
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
    }
    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params.matricule) {
                    this.adminService.getDoctor(params.matricule)
                        .subscribe((data: any) => {
                            this.doctor = { ...data.doctor, password: '' }
                            this.searchedMat = data.doctor.matricule
                        }, err => {
                            this.router.navigate(['/admin/update-medecin'])

                        })
                }
            })
    }
    onSearch() {
        this.adminService.getDoctor(this.searchedMat)
            .subscribe((data: any) => {
                this.doctor = { ...data.doctor, password: '' }
            })
    }
    onSave() {
        this.adminService.updateDoctor(this.doctor._id, this.doctor)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Dctor successfully updated!',
                    'success')
            }, err => {
                Swal.fire(
                    'Error',
                    'Something went wrong!'
                )
            })
    }

}
