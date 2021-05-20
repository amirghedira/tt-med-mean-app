import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Agent } from '../../../types/Agent';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NurseService } from '../../nurse.service';
import Swal from 'sweetalert2'
import { FamilyMember } from 'src/app/types/FamilyMember';

@Component({
    selector: 'app-ajouter-consultation',
    templateUrl: './ajouter-consultation.component.html',
    styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent implements OnInit {

    matricule: string;
    qualite: string;
    agent: Agent;
    firstNameControl = new FormControl();
    formCtrlSub: Subscription;
    selectedMember: string;
    familyMembers: FamilyMember[];


    constructor(private nurseService: NurseService) {
        this.qualite = "agent";
        this.selectedMember = "default"

    }

    onValidate() {
        if (this.agent) {
            if (this.selectedMember !== "default")
                this.nurseService.addConsultation(this.matricule, this.selectedMember, 'other')
                    .subscribe(res => {
                        Swal.fire(
                            'Sucess',
                            'La consultation a été ajoutée',
                        )
                            .then(() => {
                                this.agent = null;
                                this.qualite = "agent";
                                this.selectedMember = "default"
                                this.matricule = null
                            })
                    }, err => {
                        Swal.fire(
                            'Error',
                            'Une erreur est produite'
                        )
                    })
            else
                this.nurseService.addConsultation(this.agent.matricule.toString(), this.agent._id, 'agent')
                    .subscribe(res => {
                        Swal.fire(
                            'Sucess',
                            'La consultation a été ajoutée',
                        ).then(() => {
                            this.agent = null;
                            this.qualite = "agent";
                            this.selectedMember = "default"
                            this.matricule = null
                        })
                    }, err => {
                        console.log({ err })
                        Swal.fire(
                            'Error',
                            'Une erreur est produite'
                        )
                    })
        }
        else {
            Swal.fire(
                'Error',
                'Aucun Agent selectionné'
            )
        }
    }
    ngOnInit() {
        this.formCtrlSub = this.firstNameControl.valueChanges
            .pipe(
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(res => {
                if (this.matricule)
                    this.nurseService.getAgent(this.matricule)
                        .subscribe((res: any) => {
                            this.agent = res.agent
                            this.qualite = "agent";
                            this.selectedMember = "default"
                        }, err => {
                            this.agent = null;
                            this.qualite = "agent";
                            this.selectedMember = "default"
                        })


            })
    }
    onChangeQualite(event) {
        console.log(this.qualite)
        this.familyMembers = this.agent.familyMembers.filter(familyMember => familyMember.qualite == event.target.value)

    }
    onChangeMember() {
        if (!this.selectedMember) {
            this.qualite = 'agent'
        } else {
            if (this.agent) {

                const memberIndex = this.agent.familyMembers.findIndex(member => member._id === this.selectedMember)
                this.qualite = this.agent.familyMembers[memberIndex].qualite
            }
        }
    }

}
