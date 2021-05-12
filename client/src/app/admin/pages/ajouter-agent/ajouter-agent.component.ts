import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Agent } from 'src/app/types/Agent';
import { FamilyMember } from 'src/app/types/FamilyMember';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-ajouter-agent',
    templateUrl: './ajouter-agent.component.html',
    styleUrls: ['./ajouter-agent.component.css']
})
export class AjouterAgentComponent implements OnInit {

    agent: Agent;
    member: FamilyMember;
    @ViewChild('toggleModal', { static: true }) toggleModal: ElementRef;

    constructor(private adminService: AdminService) {
        this.resetMember()
        this.agent = {
            _id: null,
            matricule: 0,
            nom: '',
            prenom: '',
            situation: "none",
            date_n: '',
            lieu_n: '',
            genre: '',
            poste: '',
            recrutement_date: '',
            residence: '',
            numTel: '',
            familyMembers: []
        }
    }

    onAddAgent() {
        this.adminService.addAgent(this.agent)
            .subscribe(res => {
                console.log(res)
            }, err => {
                console.log(err)
            })
    }
    onAddFamilyMember() {
        this.agent.familyMembers.push(this.member)
        this.toggleModal.nativeElement.click();
        this.resetMember()
    }
    resetMember() {
        this.member = {
            _id: null,
            nom: '',
            prenom: '',
            qualite: '',
            rang: 0,
            lieu_n: '',
            genre: '',
            date_n: '',
        };
    }
    ngOnInit() {
    }

}
