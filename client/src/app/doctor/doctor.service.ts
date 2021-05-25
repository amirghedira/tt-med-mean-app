import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../types/Agent';
import { Appointment } from '../types/Appointment';
import { DossierMedical } from '../types/DossierMedical';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    constructor(private http: HttpClient) { }

    chercherDossierMedical(matricule: string, qualite: string, rang: number) {
        return this.http.get(`http://localhost:5000/dossier-medical/search/${matricule}?type=${qualite}&rang=${rang}`, { observe: 'response' })
    }
    getOrdonnancePdf(ficheId: string, appointmentId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/ordannance/${ficheId}/${appointmentId}`)

    }
    getCertificatPresencePdf(dossierId: string, ficheId: string, appointmentId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/certificat/presence/${dossierId}/${ficheId}/${appointmentId}`)

    }
    getCertificatMedicalPdf(dossierId: string, ficheId: string, appointmentId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/certificat/medical/${dossierId}/${ficheId}/${appointmentId}`)

    }
    getCertificatMariagePdf(dossierId: string, ficheId: string, appointmentId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/certificat/mariage/${dossierId}/${ficheId}/${appointmentId}`)

    }
    getCertificaAccompagnementPdf(dossierId: string, ficheId: string, appointmentId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/certificat/accompagnement/${dossierId}/${ficheId}/${appointmentId}`)

    }
    getConsultations() {
        return this.http.get('http://localhost:5000/consultation')
    }
    getTodayConsultations() {
        return this.http.get('http://localhost:5000/consultation/today')
    }
    updateConsultationClickDate(consultationId: string) {
        return this.http.patch(`http://localhost:5000/consultation/click-date/${consultationId}`, {})

    }
    deleteConsultations(consultations: string[]) {
        return this.http.patch('http://localhost:5000/consultation/delete', { consultations: consultations })
    }
    addConsultation(matricule: string, destination: string, type: string) {
        return this.http.post(`http://localhost:5000/consultation?type=${type}`, { matricule, destination })
    }
    getAgent(mat: string) {
        return this.http.get<Agent>(`http://localhost:5000/agent/${mat}`)
    }
    updateDossierMedical(dossierId: string, newDossier: DossierMedical) {
        return this.http.patch(`http://localhost:5000/dossier-medical/${dossierId}`, { dossierMedical: newDossier })
    }
    uploadDossierMedicalImage(dossierId: string, fd: FormData) {
        return this.http.patch(`http://localhost:5000/dossier-medical/dossier-image/${dossierId}`, fd)

    }
    uploadBiologyImage(dossierId: string, fd: FormData) {
        return this.http.patch(`http://localhost:5000/dossier-medical/biology-image/${dossierId}`, fd)

    }
    getDossierMedical(dossierId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/${dossierId}`)
    }
    addAppointment(ficheId: string, appointment: Appointment) {
        return this.http.post(`http://localhost:5000/dossier-medical/fiche-medicale/${ficheId}/appointment`, { appointment: appointment })

    }
    addFicheMedicalChronique(dossierId: string, maladie: string) {
        return this.http.post(`http://localhost:5000/dossier-medical/${dossierId}/fiche-medicale`, { ficheMedical: { maladie } })

    }
}
