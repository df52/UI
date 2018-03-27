import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { CategoryComponent } from './components/category.component';
import { AuthenticateService } from '../authenticate/authenticate.module';
import { LogoutCheckService } from '../authenticate/authenticate.module';

const appRoutes: Routes = [
    {
        path: 'app', canActivateChild: [AuthenticateService],

        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: CategoryComponent },
        ]

    },
];

export const CategoryRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
