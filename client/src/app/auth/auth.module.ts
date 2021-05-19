import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [AuthComponent, SignupPageComponent, LoginPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AuthRoutingModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule

    ]
})
export class AuthModule { }
