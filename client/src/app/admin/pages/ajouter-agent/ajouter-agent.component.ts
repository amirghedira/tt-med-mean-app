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
    matricule: string = '0';
    member: FamilyMember;
    errorMessage: string;
    @ViewChild('toggleModal', { static: true }) toggleModal: ElementRef;

    constructor(private adminService: AdminService) {

        this.resetAgent()
        this.resetMember()

    }
    onResetMessage() {
        this.errorMessage = ''
    }
    onChangeMatricule(event) {
        if (event.target.value.length > 5)
            this.agent.matricule = event.target.value.slice(0, 4)
    }
    onChangePhoneNumber(event) {
        if (event.target.value.length > 8)
            this.agent.numTel = event.target.value.slice(0, 7)
    }
    onAddAgent() {
        if (this.agent.matricule === 0 ||
            !this.agent.nom.trim().length ||
            !this.agent.situation.trim().length ||
            !this.agent.genre.trim().length ||
            !this.agent.poste.trim().length ||
            !this.agent.numTel.toString().trim().length)
            return this.errorMessage = 'Please fill the whole inputs'
        if (this.agent.numTel.toString().length !== 8)
            return this.errorMessage = 'invalid phone number'

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
                if (err.status === 400)
                    Swal.fire(
                        'Error',
                        'Agent with this matricule already exists'
                    )
                else
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
