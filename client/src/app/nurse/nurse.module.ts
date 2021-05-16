import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouterConsultationComponent } from './pages/ajouter-consultation/ajouter-consultation.component';
import { NurseRoutingModule } from './nurse-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DossierMedicalComponent } from './pages/dossier-medical/dossier-medical.component';
import { ConsultationsComponent } from './pages/consultations/consultations.component';
import { ChercherDossierComponent } from './pages/chercher-dossier/chercher-dossier.component';
import { MarquerPresenceComponent } from './pages/marquer-presence/marquer-presence.component';
import { NurseService } from './nurse.service';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
    declarations: [AjouterConsultationComponent, DossierMedicalComponent, ConsultationsComponent, ChercherDossierComponent, MarquerPresenceComponent],
    imports: [
        CommonModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        NurseRoutingModule
    ],
    providers: [NurseService, NgxSpinnerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class NurseModule { }
