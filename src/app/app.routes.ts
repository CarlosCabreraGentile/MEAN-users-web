import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../app/components/main-layout/main-layout.component';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/user/list',
                pathMatch: 'full',
            },
            {
              path: 'home',
              redirectTo: '/user/list',
              pathMatch: 'full',
          },
            {
                path: 'user/list',
                component: UsersListComponent,
                pathMatch: 'full',
            },
            {
                path: 'user/create',
                component: UsersComponent
            },
            {
              path: 'user/edit/:id',
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
