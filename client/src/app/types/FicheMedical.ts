import { Appointment } from "./Appointment";

export interface FicheMedical {
    _id: string
    type: string,
    maladie: string,
    appointments: Appointment[]
}