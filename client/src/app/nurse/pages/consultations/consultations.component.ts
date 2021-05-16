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
    checkedConsultations: string[] = [];
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
    isCheckedItem(consultationId) {
        return this.checkedConsultations.includes(consultationId)
    }
    checkCheckedAllItems() {
        return this.checkedConsultations.length === this.filteredConsultations.length
    }
    onChangeChecked(consultationId) {
        console.log(this.checkedConsultations)
        const consultationIndex = this.checkedConsultations.findIndex(checkedConsultation => checkedConsultation === consultationId)
        if (consultationIndex >= 0) {
            this.checkedConsultations.splice(consultationIndex, 1)
        } else {
            this.checkedConsultations.push(consultationId)
        }
    }
    onCheckUncheckAll() {
        if (this.checkCheckedAllItems()) {
            this.checkedConsultations = []
        } else {
            this.checkedConsultations = [...this.filteredConsultations.map(consultation => consultation._id)]
        }
    }
    onDeleteConsultations() {
        console.log(this.checkedConsultations)
        this.nurseService.deleteConsultations(this.checkedConsultations)
            .subscribe(res => {
                this.checkedConsultations.forEach(consultationId => {
                    const filteredConsultationIndex = this.filteredConsultations.findIndex(consultation => consultation._id === consultationId)
                    const consultationIndex = this.consultations.findIndex(consultation => consultation._id === consultationId)
                    this.filteredConsultations.splice(filteredConsultationIndex, 1)
                    this.consultations.splice(consultationIndex, 1)
                })
            })
    }
    filterConsultations() {
        this.checkedConsultations = []
        if (this.searchedMatricule && this.searchedMatricule.trim().length > 0)
            this.filteredConsultations = this.consultations.filter(consultation => consultation.agent_matricule.includes(this.searchedMatricule))
        else
            this.filteredConsultations = this.consultations


    }

}
