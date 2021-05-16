export interface User {
    _id: string,
    matricule: string,
    username: string,
    password: string,
    email: string,
    nom: string,
    prenom: string,
    numTel: string,
    role: string,
    workingHours: string[]
}