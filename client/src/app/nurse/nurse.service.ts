import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../types/Agent';

@Injectable()
export class NurseService {

    constructor(private http: HttpClient) { }

    markDoctorPresent(matricule: string) {
        return this.http.patch<{ message: string, nom: string, prenom: string }>(`http://localhost:5000/user/presence/${matricule}`, {}, { observe: "response" })
    }
    getConsultations() {
        return this.http.get('http://localhost:5000/consultation')
    }
    addConsultation(matricule: string, destination: string, type: string) {
        return this.http.post(`http://localhost:5000/consultation?type=${type}`, { matricule, destination })
    }

    getAgent(mat: string) {
        return this.http.get<Agent>(`http://localhost:5000/agent/${mat}`)
    }
}
