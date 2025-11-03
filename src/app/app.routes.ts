import { Routes } from '@angular/router';
import { Login } from './core/authentification/components/login/login';
import { Register } from './core/authentification/components/register/register';
import { Mainapp } from './core/main/mainapp/mainapp';
import { Dashboard } from './core/main/dashboard/dashboard';
import { authguardGuard } from './core/guards/authguard-guard';
import { AddNewContract } from './features/contracts/components/add-new-contract/add-new-contract';

export const routes: Routes = [
    { path : '', component : Login },
    { path : 'register' , component : Register},
    { path : 'main', component : Mainapp, canActivateChild : [authguardGuard], children : [
        {path : '', component : Dashboard},
        {path : 'add/contract' , component : AddNewContract}
    ]},
    { path : '**', redirectTo : '', pathMatch : 'full' },
];
