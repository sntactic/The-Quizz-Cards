import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';

export const routes: Routes = [
    {path : 'in',
        loadComponent:() => import('./components/sign-in-page/sign-in-page.component')
        .then(c => c.SignInPageComponent)
    },
    {path : 'up',
        loadComponent:() => import('./components/sign-up-page/sign-up-page.component')
        .then(c => c.SignUpPageComponent)
    }
];

@NgModule({
    imports: [],
    exports: []
})
export class SignRoutingModule {}