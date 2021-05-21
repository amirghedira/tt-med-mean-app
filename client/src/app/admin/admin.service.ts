import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../types/Agent';
import { Doctor } from '../types/Doctor';
import { FamilyMember } from '../types/FamilyMember';
import { Nurse } from '../types/Nurse';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) { }

    addAgent(agent: Agent) {
        return this.http.post('http://localhost:5000/agent', agent, { observe: 'response' })
    }
    getAgent(mat: string) {
        return this.http.get(`http://localhost:5000/agent/${mat}`)
    }
    getAgents() {
        return this.http.get(`http://localhost:5000/agent/`)
    }
    updateAgent(agentId: string, newAgent) {
        return this.http.patch(`http://localhost:5000/agent/${agentId}`, { newAgent: newAgent })
    }
    deleteAgent(agentId: string) {
        return this.http.delete(`http://localhost:5000/agent/${agentId}`)
    }

    deleteUser(userId: string) {
        return this.http.delete(`http://localhost:5000/user/${userId}`)

    }
    updateDoctor(userId: string, newDoctor: Doctor) {
        return this.http.patch(`http://localhost:5000/user/doctor/${userId}`, { newDoctor: newDoctor }, { observe: 'response' })

    }
    updateNurse(userId: string, newNurse: Nurse) {
        return this.http.patch(`http://localhost:5000/user/nurse/${userId}`, { newNurse: newNurse }, { observe: 'response' })

    }

    getUser(userId: string) {
        return this.http.get(`http://localhost:5000/user/${userId}`)

    }
    getDoctor(mat: string) {
        return this.http.get(`http://localhost:5000/user/doctor/${mat}`)

    }
    getNurse(mat: string) {
        return this.http.get(`http://localhost:5000/user/nurse/${mat}`)

    }

    getDoctors() {
        return this.http.get(`http://localhost:5000/user/doctor`)

    }
    getNurses() {
        return this.http.get(`http://localhost:5000/user/nurse`)


    }
    addDoctor(doctor: Doctor) {
        return this.http.post(`http://localhost:5000/user/doctor`, { doctor: doctor }, { observe: 'response' })

    }

    addNurse(nurse: Nurse) {
        return this.http.post(`http://localhost:5000/user/nurse`, { nurse: nurse }, { observe: 'response' })

    }

    addFamilyMember(agentId: string, familyMember: FamilyMember) {
        return this.http.patch(`http://localhost:5000/agent/${agentId}/family-member`, familyMember)

    }
    getDoctorWorkingHours(doctorId: string, month: string, year: string) {
        return this.http.get(`http://localhost:5000/user/doctor/working-hours/${doctorId}?month=${month}&year=${year}`)

    }

}
