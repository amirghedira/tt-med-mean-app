import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../types/Agent';
import { DossierMedical } from '../types/DossierMedical';

@Injectable()
export class NurseService {

    constructor(private http: HttpClient) { }

    markDoctorPresent(matricule: string) {
        return this.http.patch<{ message: string, nom: string, prenom: string }>(`http://localhost:5000/user/presence/${matricule}`, {}, { observe: "response" })
    }
    getDossierMedical(dossierId: string) {
        return this.http.get(`http://localhost:5000/dossier-medical/${dossierId}`)
    }
    chercherDossierMedical(matricule: string, qualite: string, rang: number) {
        return this.http.get(`http://localhost:5000/dossier-medical/search/${matricule}?type=${qualite}&rang=${rang}`, { observe: 'response' })
    }
    getConsultations() {
        return this.http.get('http://localhost:5000/consultation')
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
}
