import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{DatePipe} from'@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { DoctorModule } from './doctor/doctor.module';
import { AdminModule } from './admin/admin.module';
import { NurseModule } from './nurse/nurse.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        AuthModule,
        AdminModule,
        DoctorModule,
        NurseModule


    ],
    providers: [
        {
            provide: MAT_RADIO_DEFAULT_OPTIONS,
            useValue: { color: 'primary' },
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
