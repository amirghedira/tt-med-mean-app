import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    constructor(private http: HttpClient) { }

    chercherDossierMedical(matricule: string, qualite: string, rang: number) {
        return this.http.get(`http://localhost:5000/dossier-medical/search/${matricule}?type=${qualite}&rang=${rang}`, { observe: 'response' })
    }
}
