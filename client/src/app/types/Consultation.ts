import { Agent } from "./Agent";
import { FamilyMember } from "./FamilyMember";

export interface Consultation {
    _id: string,
    agent_matricule: string,
    agent: Agent,
    familyMember: FamilyMember,
    date: string,
}