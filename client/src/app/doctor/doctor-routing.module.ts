import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class DoctorRoutingModule { }
