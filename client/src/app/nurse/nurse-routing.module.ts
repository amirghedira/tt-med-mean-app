import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterConsultationComponent } from './pages/ajouter-consultation/ajouter-consultation.component';
import { ChercherDossierComponent } from './pages/chercher-dossier/chercher-dossier.component';
import { ConsultationsComponent } from './pages/consultations/consultations.component';
import { DossierMedicalComponent } from './pages/dossier-medical/dossier-medical.component';
import { MarquerPresenceComponent } from './pages/marquer-presence/marquer-presence.component';


const routes: Routes = [
    { path: 'marquer-presence', component: MarquerPresenceComponent },
    { path: 'ajouter-consultation', component: AjouterConsultationComponent },
    { path: 'chercher-dossier', component: ChercherDossierComponent },
    { path: 'dossier-medical', component: DossierMedicalComponent },
    { path: 'consultations', component: ConsultationsComponent },
    { path: '**', redirectTo: 'ajouter-consultation' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class NurseRoutingModule { }
