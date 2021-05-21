import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../nurse.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-marquer-presence',
    templateUrl: './marquer-presence.component.html',
    styleUrls: ['./marquer-presence.component.css']
})
export class MarquerPresenceComponent implements OnInit {

    matricule: string;
    errorMessage: string;
    presenceDate: string;
    constructor(private nurseService: NurseService) {
    }

    ngOnInit() {
    }
    onValidate() {
        this.nurseService.markDoctorPresent(this.matricule, this.presenceDate)
            .subscribe(res => {
                Swal.fire(
                    'Presence marqué',
                    `la presence de ${res.body.nom} ${res.body.prenom} a été marquée`,
                )
            }, err => {
                if (err.status === 404)
                    this.errorMessage = 'Aucun docteur avec cette cin'
                else if (err.status === 409)
                    this.errorMessage = 'Vous avez deja marqué la presence d\'un medecin'
                else if (err.status === 400)
                    this.errorMessage = 'Ce medecin est deja marqué present'
                else
                    this.errorMessage = 'Une erreur est produite'
            })

    }
    resetErrorMessage() {
        this.errorMessage = ''
    }

}
