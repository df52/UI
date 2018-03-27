import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { LoginComponent } from './components/login.component';
import { RegisterUserComponent } from './components/register.component';
import { LogoutCheckService } from '../authenticate/authenticate.module';

const appRoutes: Routes = [
    {
        path: 'public', canActivateChild: [LogoutCheckService],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent }
        ]
    },
];

export const LoginRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
