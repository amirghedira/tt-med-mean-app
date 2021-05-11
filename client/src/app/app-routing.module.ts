import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';



const routes: Routes = [

    {
        path: 'admin',
        component: AdminComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: '',
        component: GuestComponent,
        loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
    },
    { path: '**', redirectTo: '' },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
