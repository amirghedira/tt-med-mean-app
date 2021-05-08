import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full', },
    { path: 'login', component: LoginPageComponent },
    { path: 'sign-up', component: SignupPageComponent },
    { path: '**', redirectTo: 'login' },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
