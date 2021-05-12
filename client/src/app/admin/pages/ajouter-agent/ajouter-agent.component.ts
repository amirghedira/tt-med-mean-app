import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Agent } from 'src/app/types/Agent';
import { FamilyMember } from 'src/app/types/FamilyMember';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

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

        this.resetAgent()
        this.resetMember()

    }

    onAddAgent() {
        this.adminService.addAgent(this.agent)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Agent successfully added!',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        this.resetAgent()
                    }
                })
            }, err => {
                Swal.fire(
                    'Error',
                    'Something went wrong!'
                )
            })
    }
    onAddFamilyMember() {
        this.agent.familyMembers.push(this.member)
        console.log(this.member)
        this.toggleModal.nativeElement.click();
        this.resetMember()
    }
    resetAgent() {
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
