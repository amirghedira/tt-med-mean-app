import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';



const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        loadChildren: () => import('./auth/guest.module').then(m => m.AuthModule)
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
