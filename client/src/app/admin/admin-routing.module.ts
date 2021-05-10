import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterAgentComponent } from './pages/ajouter-agent/ajouter-agent.component';
import { AjouterInfirmierComponent } from './pages/ajouter-infirmier/ajouter-infirmier.component';
import { AjouterMedecinComponent } from './pages/ajouter-medecin/ajouter-medecin.component';
import { ConsulterAgentComponent } from './pages/consulter-agent/consulter-agent.component';
import { ConsulterInfirmierComponent } from './pages/consulter-infirmier/consulter-infirmier.component';
import { ConsulterMedecinComponent } from './pages/consulter-medecin/consulter-medecin.component';
import { MiseAJourAgentComponent } from './pages/mise-a-jour-agent/mise-a-jour-agent.component';
import { MiseAJourInfirmierComponent } from './pages/mise-a-jour-infirmier/mise-a-jour-infirmier.component';
import { MiseAJourMedecinComponent } from './pages/mise-a-jour-medecin/mise-a-jour-medecin.component';


const routes: Routes = [
    { path: 'ajouter-agent', component: AjouterAgentComponent },
    { path: 'ajouter-medecin', component: AjouterMedecinComponent },
    { path: 'ajouter-infirmier', component: AjouterInfirmierComponent },
    { path: 'medecin', component: ConsulterMedecinComponent },
    { path: 'agent', component: ConsulterAgentComponent },
    { path: 'infirmier', component: ConsulterInfirmierComponent },
    { path: 'update-agent/:id', component: MiseAJourAgentComponent },
    { path: 'update-medecin/:id', component: MiseAJourMedecinComponent },
    { path: 'update-infirmier/:id', component: MiseAJourInfirmierComponent },
    { path: '**', redirectTo: 'ajouter-agent' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }