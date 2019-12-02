import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../app/components/main-layout/main-layout.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/user/create',
                pathMatch: 'full',
            },
            // {
            //     path: 'home',
            //     redirectTo: '/players',
            //     pathMatch: 'full',
            // },
            {
                path: 'user/create',
                component: UsersComponent
            },
            // {
            //     path: 'user/detail/:id',
            //     component: DetailPlayerComponent
            // },
            // {
            //     path: 'user/create',
            //     component: FormPlayerComponent
            // },
            // {
            //     path: 'user/edit/:id',
            //     component: FormPlayerComponent
            // }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
