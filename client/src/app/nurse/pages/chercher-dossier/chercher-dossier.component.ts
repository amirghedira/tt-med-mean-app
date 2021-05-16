import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../nurse.service';

@Component({
    selector: 'app-chercher-dossier',
    templateUrl: './chercher-dossier.component.html',
    styleUrls: ['./chercher-dossier.component.css']
})
export class ChercherDossierComponent implements OnInit {

    matricule: string;
    qualite: string;
    rang: number;
    errorMessage: string;
    constructor(private nurseService: NurseService) {
        this.qualite = "agent"
    }

    ngOnInit() {
    }
    onValidate() {
        if (!this.matricule || this.matricule.toString().trim().length === 0)
            return this.errorMessage = 'Entrez la matricule'
        this.nurseService.chercherDossierMedical(this.matricule, this.qualite, this.rang)
            .subscribe((res: any) => {
                console.log(res)
            }, err => {
                if (err.status === 404)
                    this.errorMessage = 'Aucun dossier medical'
            })
    }
    resetErrorMessage() {
        this.errorMessage = ''
    }

}
