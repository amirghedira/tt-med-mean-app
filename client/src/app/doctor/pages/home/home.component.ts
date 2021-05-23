import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consultation } from 'src/app/types/Consultation';
import { DoctorService } from '../../doctor.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    consultations: Consultation[]
    constructor(private doctorService: DoctorService, private router: Router) { }

    ngOnInit() {
        this.doctorService.getTodayConsultations()
            .subscribe((res: any) => {
                this.consultations = res.consultations
            })
    }
    onNavigateDossierMedical(consultationId: string) {
        const consultationIndex = this.consultations.findIndex(consultation => consultation._id == consultationId)
        const consultation = this.consultations[consultationIndex]
        if (consultation.agent) {
            this.doctorService.chercherDossierMedical(consultation.agent_matricule, 'agent', 0)
                .subscribe((res: any) => {
                    this.doctorService.updateConsultationClickDate(consultationId).subscribe(() => {
                        this.router.navigate(['doctor', 'dossier-medical', res.body.dossierMedical._id])

                    })
                })

        } else {
            this.doctorService.chercherDossierMedical(consultation.agent_matricule, consultation.familyMember.qualite,
                consultation.familyMember.rang)
                .subscribe((res: any) => {
                    this.doctorService.updateConsultationClickDate(consultationId).subscribe(() => {
                        this.router.navigate(['doctor', 'dossier-medical', res.body.dossierMedical._id])
                    })

                })

        }
    }

}
