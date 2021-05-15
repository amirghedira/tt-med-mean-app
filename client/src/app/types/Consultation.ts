import { Agent } from "./Agent";
import { FamilyMember } from "./FamilyMember";

export interface Consultation {
    agent_matricule: string,
    agent: Agent,
    familyMember: FamilyMember,
    date: string,
}