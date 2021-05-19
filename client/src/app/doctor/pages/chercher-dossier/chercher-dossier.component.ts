import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctor.service';

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
    constructor(private doctorService: DoctorService, private router: Router) {
        this.qualite = "agent"
    }

    ngOnInit() {
    }
    onValidate() {
        if (!this.matricule || this.matricule.toString().trim().length === 0)
            return this.errorMessage = 'Entrez la matricule'
        this.doctorService.chercherDossierMedical(this.matricule, this.qualite, this.rang)
            .subscribe((res: any) => {
                this.router.navigate(['nurse', 'dossier-medical', res.body.dossierMedical._id])
            }, err => {
                if (err.status === 404)
                    this.errorMessage = 'Aucun dossier medical'
            })
    }
    resetErrorMessage() {
        this.errorMessage = ''
    }

}
