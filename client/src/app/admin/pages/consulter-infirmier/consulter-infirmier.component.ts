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
        this.adminService.getNurses()
            .subscribe((data: any) => {
                this.nurses = JSON.parse(JSON.stringify(data.nurses))
                this.filtredNurses = JSON.parse(JSON.stringify(data.nurses))
            }, err => {
                console.log(err)
            })
    }
    onDeleteNurse(nurseId: string) {
        this.adminService.deleteUser(nurseId)
            .subscribe(() => {
                const nurseIndex = this.nurses.findIndex((nurse) => nurse._id === nurseId)
                const filteredNurseIndex = this.filtredNurses.findIndex(nurse => nurse._id === nurseId)
                this.filtredNurses.splice(filteredNurseIndex, 1)
                this.nurses.splice(nurseIndex, 1)
            })

    }
    filterNurses() {
        this.filtredNurses = this.nurses.filter((nurse) => nurse.matricule.toString().includes(this.searchedMat))
    }
}
