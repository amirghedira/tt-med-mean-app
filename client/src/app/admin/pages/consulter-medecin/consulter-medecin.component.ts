import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/types/Doctor';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-consulter-medecin',
    templateUrl: './consulter-medecin.component.html',
    styleUrls: ['./consulter-medecin.component.css']
})
export class ConsulterMedecinComponent implements OnInit {

    doctors: Doctor[];
    filtredDoctors: Doctor[];
    selectedDoctor: Doctor;
    searchedMat: string;
    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.adminService.getDoctors()
            .subscribe((data: any) => {
                console.log(data)
                this.doctors = data.doctors
                this.filtredDoctors = data.doctors
            })
    }
    onDeleteDoctor(doctorId: string) {
        this.adminService.deleteUser(doctorId)
            .subscribe(() => {
                const doctorIndex = this.doctors.findIndex((doctor) => doctor._id === doctorId)
                this.doctors.splice(doctorIndex, 1)
                this.filterDoctors()
            })

    }
    filterDoctors() {
        this.filtredDoctors = this.doctors.filter((doctor) => doctor.matricule.toString().includes(this.searchedMat))
    }
    setSelectedDoctor(doctorId) {
        const doctorIndex = this.doctors.findIndex(doctor => doctor._id === doctorId)
        this.selectedDoctor = this.doctors[doctorIndex]
    }
}
