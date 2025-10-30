import { Routes } from '@angular/router';
import { MyCardsResolver } from './quizz-cards/resolver/myCards.resolver';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';

export const routes: Routes = [
    {path:'quizzcards/:id',
        loadComponent :()=> import('./quizz-cards/components/sigle-quizz-card /sigle-quizz-card.component')
        .then(s => s.SigleQuizzCardComponent)
    },
    {path:'quizzcards',
        loadComponent :()=> import('./quizz-cards/components/quizzcard-list/quizzcard-list.component')
        .then(q => q.QuizzcardListComponent)
    },
    {path:'',
        loadComponent:()=> import('./annex-pages/components/landing-page/landing-page.component')
        .then(p => p.LandingPageComponent),
    },
    {path:'mycards',
        loadComponent:()=> import('./quizz-cards/components/my-cards/my-cards.component')
        .then(p => p.MyCardsComponent),
        //resolve: {quizzcards : MyCardsResolver}
    },
    {path:'createcard',
        loadComponent:()=> import('./quizz-cards/components/create-card/create-card.component')
        .then(p => p.CreateCardComponent)
    },
    {path : 'editcard',
        loadComponent:()=> import('./quizz-cards/components/edit-card/edit-card.component')
        .then(p => p.EditCardComponent)
    },
    {path : 'sign',
        loadChildren:() => import('./annex-pages/sign.routing')
        .then(m => m.routes)
    },
    {
        path: 'auth/callback',
        component: AuthCallbackComponent
    },
    {
        path: 'adminpage',
        loadComponent: () => import('./quizz-cards/components/admin-page/admin-page.component')
            .then(m => m.AdminPageComponent)
    }

];
