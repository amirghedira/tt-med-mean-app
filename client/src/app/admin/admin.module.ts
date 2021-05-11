import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AjouterAgentComponent } from './pages/ajouter-agent/ajouter-agent.component';
import { AjouterInfirmierComponent } from './pages/ajouter-infirmier/ajouter-infirmier.component';
import { ConsulterAgentComponent } from './pages/consulter-agent/consulter-agent.component';
import { ConsulterMedecinComponent } from './pages/consulter-medecin/consulter-medecin.component';
import { MiseAJourMedecinComponent } from './pages/mise-a-jour-medecin/mise-a-jour-medecin.component';
import { MiseAJourAgentComponent } from './pages/mise-a-jour-agent/mise-a-jour-agent.component';
import { MiseAJourInfirmierComponent } from './pages/mise-a-jour-infirmier/mise-a-jour-infirmier.component';
import { ConsulterInfirmierComponent } from './pages/consulter-infirmier/consulter-infirmier.component';
import { AjouterMedecinComponent } from './pages/ajouter-medecin/ajouter-medecin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { MatRadioModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
    declarations: [AjouterAgentComponent, AjouterInfirmierComponent, ConsulterAgentComponent, ConsulterMedecinComponent, MiseAJourMedecinComponent, MiseAJourAgentComponent, MiseAJourInfirmierComponent, ConsulterInfirmierComponent, AjouterMedecinComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
