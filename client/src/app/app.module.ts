import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSideBarComponent } from './admin/components/side-bar/side-bar.component';
import { AdminNavBarComponent } from './admin/components/nav-bar/nav-bar.component';
import { NurseComponent } from './nurse/nurse.component';
import { NurseNavBarComponent } from './nurse/components/nav-bar/nav-bar.component';
import { NurseSideBarComponent } from './nurse/components/side-bar/side-bar.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        AdminComponent,
        NurseComponent,
        AdminNavBarComponent,
        AdminSideBarComponent,
        NurseNavBarComponent,
        NurseSideBarComponent
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


    ],
    providers: [{
        provide: MAT_RADIO_DEFAULT_OPTIONS,
        useValue: { color: 'primary' },
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
