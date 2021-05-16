import { Agent } from "./Agent";
import { FamilyMember } from "./FamilyMember";
import { FicheMedical } from "./FicheMedical";

export interface DossierMedical {
    _id: string,
    agent_matricule: string,
    type: { type: String, enum: ['agent', 'other'], default: 'agent' },
    familyMember: FamilyMember,
    agent: Agent,
    image: string,
    anthropometriques: {
        poid: string,
        taille: string,
        vision_pre_droite: string,
        vision_pre_gauche: string,
        vision_loin_droite: string,
        vision_loin_gauche: string,
        audition_oreille_gauche: string,
        audition_oreille_droite: string,
        puls: string,
        tension: string
    },
    biologiques: {
        current: string,
        history: string[]
    },
    fiche_medical: FicheMedical[],
    maladieChronique: string[]
}