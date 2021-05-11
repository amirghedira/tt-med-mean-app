import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';



@NgModule({
    declarations: [SignupPageComponent, LoginPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule

    ]
})
export class AuthModule { }
