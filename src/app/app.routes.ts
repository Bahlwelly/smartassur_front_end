import { Routes } from '@angular/router';
import { Login } from './core/authentification/components/login/login';
import { Register } from './core/authentification/components/register/register';

export const routes: Routes = [
    { path : '', component : Login },
    { path : 'register' , component : Register},
    { path : '**', redirectTo : '', pathMatch : 'full' }
];
