import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { RoleGuard } from './guards/role.guard';
import { NurseComponent } from './nurse/nurse.component';



const routes: Routes = [
    {
        path: 'auth',
        canActivate: [GuestGuard],
        component: AuthComponent,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'nurse',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'nurse' },
        component: NurseComponent,
        loadChildren: () => import('./nurse/nurse.module').then(m => m.NurseModule)
    },
    {
        path: 'doctor',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'doctor' },
        component: DoctorComponent,
        loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule)
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'admin' },
        component: AdminComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: 'auth' },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
