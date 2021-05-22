import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterConsultationComponent } from './pages/ajouter-consultation/ajouter-consultation.component';
import { ChercherDossierComponent } from './pages/chercher-dossier/chercher-dossier.component';
import { ConsultationsComponent } from './pages/consultations/consultations.component';
import { DossierMedicalComponent } from './pages/dossier-medical/dossier-medical.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'ajouter-consultation', component: AjouterConsultationComponent },
    { path: 'consultations', component: ConsultationsComponent },
    { path: 'chercher-dossier', component: ChercherDossierComponent },
    { path: 'dossier-medical/:id', component: DossierMedicalComponent },
    { path: '**', redirectTo: 'home' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class DoctorRoutingModule { }
