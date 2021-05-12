import { FamilyMember } from "./FamilyMember";

export interface Agent {
    _id: string,
    matricule: number,
    nom: string,
    prenom: string,
    situation: string,
    date_n: string,
    lieu_n: string,
    genre: string,
    poste: string,
    recrutement_date: String,
    residence: string,
    numTel: string,
    familyMembers: FamilyMember[]
}