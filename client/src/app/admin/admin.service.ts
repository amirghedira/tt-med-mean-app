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
        return this.http.post('http://localhost:5000/agent', agent)
    }
    getAgent(agentId: string) {
        return this.http.get(`http://localhost:5000/agent/${agentId}`)
    }
    getAgents() {
        return this.http.get(`http://localhost:5000/agent/`)
    }
    updateAgent(agentId: string, newInfo) {
        return this.http.patch(`http://localhost:5000/agent/${agentId}`, newInfo)
    }
    deleteAgent(agentId: string) {
        return this.http.delete(`http://localhost:5000/agent/${agentId}`)
    }

    deleteUser(userId: string) {
        return this.http.delete(`http://localhost:5000/user/${userId}`)

    }
    updateDoctor(userId: string, newDoctor: Doctor) {
        return this.http.post(`http://localhost:5000/user/${userId}`, { newUser: newDoctor })

    }
    updateNurse(userId: string, newNurse: Nurse) {
        return this.http.post(`http://localhost:5000/user/${userId}`, { newUser: newNurse })

    }

    getUser(userId: string) {
        return this.http.get(`http://localhost:5000/user/${userId}`)

    }

    getDoctors() {
        return this.http.get(`http://localhost:5000/user/doctor`)

    }
    getNurses() {
        return this.http.get(`http://localhost:5000/user/nurse`)


    }
    addDoctor(doctor: Doctor) {
        return this.http.post(`http://localhost:5000/user/doctor`, { doctor: doctor })

    }

    addNurse(nurse: Nurse) {
        return this.http.post(`http://localhost:5000/user/nurse`, { nurse: nurse })

    }

    addFamilyMember(agentId: string, familyMember: FamilyMember) {
        return this.http.patch(`http://localhost:5000/agent/${agentId}/family-member`, familyMember)

    }
}
