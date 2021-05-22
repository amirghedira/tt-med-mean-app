import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import { DoctorService } from './doctor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { DoctorRoutingModule } from './doctor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ConsultationsComponent } from './pages/consultations/consultations.component';
import { HomeComponent } from './pages/home/home.component';
import { DossierMedicalComponent } from './pages/dossier-medical/dossier-medical.component';
import { DoctorNavBarComponent } from './components/nav-bar/nav-bar.component';
import { DoctorSideBarComponent } from './components/side-bar/side-bar.component';
import { AjouterConsultationComponent } from './pages/ajouter-consultation/ajouter-consultation.component';
import { ChercherDossierComponent } from './pages/chercher-dossier/chercher-dossier.component';



@NgModule({
    declarations: [
        DoctorComponent,
        ConsultationsComponent,
        AjouterConsultationComponent,
        HomeComponent,
        DossierMedicalComponent,
        ChercherDossierComponent,
        DoctorNavBarComponent,
        DoctorSideBarComponent
    ],
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
        DoctorRoutingModule
    ],
    providers: [DoctorService, NgxSpinnerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }]
})
export class DoctorModule { }
