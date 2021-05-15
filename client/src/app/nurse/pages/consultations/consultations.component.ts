import { Component, OnInit } from '@angular/core';
import { Consultation } from 'src/app/types/Consultation';
import { NurseService } from '../../nurse.service';

@Component({
    selector: 'app-consultations',
    templateUrl: './consultations.component.html',
    styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
    consultations: Consultation[] = [];
    filteredConsultations: Consultation[] = [];
    searchedMatricule: string;
    constructor(private nurseService: NurseService) { }

    ngOnInit() {
        this.nurseService.getConsultations()
            .subscribe((res: any) => {
                this.consultations = res.consultations
                this.filteredConsultations = res.consultations
            })

    }
    formatDate(date: string) {
        const dateObj = new Date(date)
        return dateObj.toLocaleDateString()
    }
    filterConsultations() {
        if (this.searchedMatricule && this.searchedMatricule.trim().length > 0)
            this.filteredConsultations = this.consultations.filter(consultation => consultation.agent_matricule.includes(this.searchedMatricule))
        else
            this.filteredConsultations = this.consultations


    }

}
