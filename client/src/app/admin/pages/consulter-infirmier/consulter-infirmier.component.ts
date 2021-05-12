import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/types/Doctor';
import { Nurse } from 'src/app/types/Nurse';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-consulter-infirmier',
    templateUrl: './consulter-infirmier.component.html',
    styleUrls: ['./consulter-infirmier.component.css']
})
export class ConsulterInfirmierComponent implements OnInit {

    nurses: Nurse[];
    filtredNurses: Nurse[];
    searchedMat: string;
    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.adminService.getDoctors()
            .subscribe((data: any) => {
                this.nurses = data.nurses
            })
    }
    onDeleteNurse(nurseId: string) {
        this.adminService.deleteUser(nurseId)
            .subscribe(() => {
                const doctorIndex = this.nurses.findIndex((nurse) => nurse._id === nurseId)
                this.nurses.splice(doctorIndex, 1)
                this.filterNurses()
            })

    }
    filterNurses() {
        this.filtredNurses = this.nurses.filter((nurse) => nurse.matricule.toString().includes(this.searchedMat))
    }
}
