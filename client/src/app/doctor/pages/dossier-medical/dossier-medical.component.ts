import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/types/Agent';
import { DossierMedical } from 'src/app/types/DossierMedical';
import { FamilyMember } from 'src/app/types/FamilyMember';
import Swal from 'sweetalert2'
import { ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DoctorService } from '../../doctor.service';
import { FicheMedical } from 'src/app/types/FicheMedical';
import { Appointment } from 'src/app/types/Appointment';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
@Component({
    selector: 'app-dossier-medical',
    templateUrl: './dossier-medical.component.html',
    styleUrls: ['./dossier-medical.component.css']   
})
export class DossierMedicalComponent implements OnInit {

    dossierMedical: DossierMedical;
    editedDossierMedical: any;
    loadingUploadDossierImage: boolean = false;
    loadingUploadBiologyImage: boolean = false;
    selectedFichedMedicalChronique: FicheMedical;
    selectedFicheToAddAppointment: string;
    maladieToAdd: string;
    selectedHistoryAnthropometrique;
    newAppointment: Appointment;
    owner: Agent | FamilyMember;
    isEditing: boolean;
    @ViewChild('fileDossierImage', { static: true }) fileDossierImage: ElementRef;
    @ViewChild('fileBiologyImage', { static: true }) fileBiologyImage: ElementRef;
    @ViewChild('modalAddAppointment', { static: true }) modalAddAppointment: ElementRef;


    constructor(private doctorService: DoctorService, private route: ActivatedRoute, private ngxSpinnerService: NgxSpinnerService) {
        this.isEditing = false;
        this.ngxSpinnerService.show()
        this.resetNewAppointment()
    }

    onChangeSelectedHistoryAnthropometrique(event) {
        if (event.target.value === 'current') {
            this.selectedHistoryAnthropometrique = this.dossierMedical.anthropometriques
        } else {
            const index = this.dossierMedical.anthropometriques_history.findIndex(anthHistory => anthHistory._id == event.target.value)
            this.selectedHistoryAnthropometrique = this.dossierMedical.anthropometriques_history[index]
        }
    }
    onDownloadPdfOrdonnance(ficheId, appointmentId) {
        this.doctorService.getOrdonnancePdf(ficheId, appointmentId)
            .subscribe((res: any) => {
                const byteCharacters = atob(res.blob);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                saveAs(pdfBlob, `${appointmentId}.pdf`);
            })
    }
    onDownloadPdfCertificat(ficheId, appointment) {
        switch (appointment.certificat) {
            case 'medical':
                this.doctorService.getCertificatMedicalPdf(this.dossierMedical._id, ficheId, appointment._id)
                    .subscribe((res: any) => {
                        const byteCharacters = atob(res.blob);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                        saveAs(pdfBlob, `${appointment._id}.pdf`);
                    })
                break;
            case 'accompagnement':
                this.doctorService.getCertificaAccompagnementPdf(this.dossierMedical._id, ficheId, appointment._id)
                    .subscribe((res: any) => {
                        const byteCharacters = atob(res.blob);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                        saveAs(pdfBlob, `${appointment._id}.pdf`);
                    })
                break;
            case 'precense':
                this.doctorService.getCertificatPresencePdf(this.dossierMedical._id, ficheId, appointment._id)
                    .subscribe((res: any) => {
                        const byteCharacters = atob(res.blob);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                        saveAs(pdfBlob, `${appointment._id}.pdf`);
                    })
                break;
            case 'mariage':
                this.doctorService.getCertificatMariagePdf(this.dossierMedical._id, ficheId, appointment._id)
                    .subscribe((res: any) => {
                        const byteCharacters = atob(res.blob);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                        saveAs(pdfBlob, `${appointment._id}.pdf`);
                    })
                break;

            default:
                break;
        }

    }
    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.doctorService.getDossierMedical(params.id)
                    .subscribe((res: any) => {
                        if (!res.dossierMedical.image) {
                            res.dossierMedical.image = 'assets/images/default-avatar.png'
                        }
                        this.dossierMedical = JSON.parse(JSON.stringify(res.dossierMedical))
                        this.selectedHistoryAnthropometrique = this.dossierMedical.anthropometriques;
                        this.editedDossierMedical = JSON.parse(JSON.stringify(res.dossierMedical))
                        if (res.dossierMedical.type === 'agent') {
                            this.owner = res.dossierMedical.agent
                        } else {
                            this.owner = res.dossierMedical.familyMember
                        }
                    }, err => {
                        console.log(err)
                    })
            })
    }
    resetNewAppointment() {
        this.newAppointment = {
            _id: null,
            observation: '',
            prescription: '',
            date: new Date().toISOString(),
            certificat: '',
            haveOrdonnance: false,

        }
    }
    onChangeBiologyImage(event) {
        const fd = new FormData()
        fd.append('biology-image', event.target.files[0])
        this.loadingUploadBiologyImage = true;
        this.doctorService.uploadBiologyImage(this.editedDossierMedical._id, fd)
            .subscribe((res: any) => {
                this.loadingUploadBiologyImage = false;
                if (this.editedDossierMedical.biologiques)
                    this.editedDossierMedical.biologiques.history.push(this.editedDossierMedical.biologiques.current)
                else
                    this.editedDossierMedical.biologiques.history = [this.editedDossierMedical.biologiques.current]

                this.editedDossierMedical.biologiques.current = res.newImage
                this.dossierMedical = JSON.parse(JSON.stringify(this.editedDossierMedical))

            }, err => {
                console.log(err)
            })
    }
    onChangeDossierImage(event) {
        const fd = new FormData()
        fd.append('dossier-image', event.target.files[0])
        this.loadingUploadDossierImage = true;
        this.doctorService.uploadDossierMedicalImage(this.editedDossierMedical._id, fd)
            .subscribe((res: any) => {

                this.loadingUploadDossierImage = false;
                this.editedDossierMedical.image = res.newImage
                this.dossierMedical = JSON.parse(JSON.stringify(this.editedDossierMedical))
            }, err => {
                console.log(err)
            })
    }
    importDossierImage() {
        if (this.isEditing) {
            this.fileDossierImage.nativeElement.click()

        }
    }
    setFicheToAddAppointment(ficheId) {
        this.selectedFicheToAddAppointment = ficheId
    }
    selectFicheMaladieChronique(ficheId) {
        const ficheMaladieChroniqueIndex = this.dossierMedical.fiche_medical_chronique.findIndex(maladieChronique => maladieChronique._id === ficheId)
        this.selectedFichedMedicalChronique = JSON.parse(JSON.stringify(this.dossierMedical.fiche_medical_chronique[ficheMaladieChroniqueIndex]))
    }
    onAddAppointment() {
        this.doctorService.addAppointment(this.selectedFicheToAddAppointment, this.newAppointment)
            .subscribe(res => {
                if (this.dossierMedical.fiche_medical_ordinaire._id == this.selectedFicheToAddAppointment) {
                    this.editedDossierMedical.fiche_medical_ordinaire.appointments.push(this.newAppointment)
                } else {
                    const editedFicheMedicalChroniqueIndex = this.editedDossierMedical.fiche_medical_chronique.findIndex(fiche => fiche._id == this.selectedFicheToAddAppointment)
                    this.editedDossierMedical.fiche_medical_chronique[editedFicheMedicalChroniqueIndex].appointments.push(this.newAppointment)
                    this.selectedFichedMedicalChronique = this.editedDossierMedical.fiche_medical_chronique[editedFicheMedicalChroniqueIndex]
                }
                const buttonOpenAddAppointment = document.getElementById('button-add-appointment')
                buttonOpenAddAppointment.click()
                this.resetNewAppointment()


            }, err => {
                console.log(err)
            })
    }
    onAddFicheMedicalChronique() {
        this.doctorService.addFicheMedicalChronique(this.dossierMedical._id, this.maladieToAdd)
            .subscribe((res: any) => {
                const buttonOpenAddMaladieModal = document.getElementById('button-add-maladie')

                this.editedDossierMedical.fiche_medical_chronique.push(JSON.parse(JSON.stringify(res.ficheMedical)))
                this.selectedFichedMedicalChronique = JSON.parse(JSON.stringify(res.ficheMedical))
                this.maladieToAdd = ''
                buttonOpenAddMaladieModal.click()
            }, err => {
                console.log(err)
            })

    }
    importBiologyImage() {
        this.fileBiologyImage.nativeElement.click()
    }
    onToggleEdit() {
        this.isEditing = !this.isEditing
        this.editedDossierMedical = JSON.parse(JSON.stringify(this.dossierMedical))
    }
    onValidate() {
        this.dossierMedical = JSON.parse(JSON.stringify(this.editedDossierMedical))
        this.doctorService.updateDossierMedical(this.editedDossierMedical._id, this.editedDossierMedical)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Le dossier a été modifié',
                )
                this.isEditing = false;
            })

    }
    formatDateHistory(date: string) {
        return moment(new Date(date)).format('DD-MM-YYYY HH:mm:ss')
    }

    formatDate(date: string) {
        return moment(new Date(date)).format('DD-MM-YYYY')

    }

}
