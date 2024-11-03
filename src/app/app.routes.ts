// app-routing.module.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { InputFormComponent } from './content/input-form/input-form.component';
import { ResultsComponent } from './content/results/results.component';
import { HistoryComponent } from './content/history/history.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InputFormComponent, // Carrega o formulário como padrão ao acessar /home
      },
      {
        path: 'input-form',
        component: InputFormComponent,
      },
      {
        path: 'results',
        component: ResultsComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home', // Redireciona para /home ao acessar a raiz
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home', // Redireciona para /home em caso de rotas inválidas
  },
];
