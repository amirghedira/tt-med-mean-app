import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    // {
    //     path: '',
    //     loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
    // },
    { path: '**', redirectTo: '' },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
