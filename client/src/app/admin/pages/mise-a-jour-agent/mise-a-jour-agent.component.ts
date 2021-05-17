import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'src/app/types/Agent';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'
import { FamilyMember } from 'src/app/types/FamilyMember';

@Component({
    selector: 'app-mise-a-jour-agent',
    templateUrl: './mise-a-jour-agent.component.html',
    styleUrls: ['./mise-a-jour-agent.component.css']
})
export class MiseAJourAgentComponent implements OnInit {

    agent: Agent
    searchedMat: string;
    member: FamilyMember;
    @ViewChild('toggleModal', { static: true }) toggleModal: ElementRef;

    constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
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
        this.resetMember()
    }
    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params.matricule) {
                    this.adminService.getAgent(params.matricule)
                        .subscribe((data: any) => {
                            this.agent = data.agent
                            this.searchedMat = data.agent.matricule
                        }, err => {
                            this.router.navigate(['/admin/update-agent'])

                        })
                }
            })
    }
    onSearch() {
        this.adminService.getAgent(this.searchedMat)
            .subscribe((data: any) => {
                this.agent = { ...data.agent }
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
    onSave() {
        this.adminService.updateAgent(this.agent._id, this.agent)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Agent successfully updated!',
                    'success')
            }, err => {
                Swal.fire(
                    'Error',
                    'Something went wrong!'
                )
            })
    }

}
