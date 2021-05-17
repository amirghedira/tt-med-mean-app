export interface Doctor {
    _id: string,
    matricule: number,
    username: string,
    password: string,
    email: string,
    nom: string,
    prenom: string,
    role: string,
    numTel: string,
    workingHours: string[]
}