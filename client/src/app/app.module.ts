import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldControl, MatFormFieldModule, MatInputModule, MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        SignupPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule

    ],
    providers: [{
        provide: MAT_RADIO_DEFAULT_OPTIONS,
        useValue: { color: 'primary' },
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
