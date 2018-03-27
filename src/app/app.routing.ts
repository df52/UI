import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/public/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);