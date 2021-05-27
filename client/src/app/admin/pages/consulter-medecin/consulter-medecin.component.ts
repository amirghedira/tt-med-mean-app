import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/types/Doctor';
import { AdminService } from '../../admin.service';
import { saveAs } from 'file-saver';

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
    selectedDoctorHours: number;
    workingHoursMonth: string;
    workingHoursYear: string;
    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.adminService.getDoctors()
            .subscribe((data: any) => {
                this.doctors = JSON.parse(JSON.stringify(data.doctors))
                this.filtredDoctors = JSON.parse(JSON.stringify(data.doctors))
            })
    }

    onDeleteDoctor(doctorId: string) {
        this.adminService.deleteUser(doctorId)
            .subscribe(() => {
                const doctorIndex = this.doctors.findIndex((doctor) => doctor._id === doctorId)
                const filteredDoctorIndex = this.filtredDoctors.findIndex((doctor) => doctor._id === doctorId)
                this.doctors.splice(doctorIndex, 1)
                this.filtredDoctors.splice(filteredDoctorIndex, 1)
            })

    }
    filterDoctors() {
        this.filtredDoctors = this.doctors.filter((doctor) => doctor.matricule.toString().includes(this.searchedMat))
    }
    getDoctorHours() {

        const _workingHours = this.selectedDoctor.workingHours.filter(workingHour => {
            return ((new Date(workingHour)).getMonth() + 1 == +this.workingHoursMonth &&
                (new Date(workingHour)).getFullYear() == +this.workingHoursYear)
        })
        this.selectedDoctorHours = _workingHours.length;

    }
    onGetDoctorPresencePdf() {
        this.adminService.getDoctorPresencePdf(2, 2021)
            .subscribe((res: any) => {
                const byteCharacters = atob(res.blob);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                saveAs(pdfBlob, `first.pdf`);
            })
    }
    setSelectedDoctor(doctorId) {
        const doctorIndex = this.doctors.findIndex(doctor => doctor._id === doctorId)
        this.selectedDoctor = this.doctors[doctorIndex]
        this.selectedDoctorHours = this.doctors[doctorIndex].workingHours.length;

    }
}
