import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { InputFormComponent } from './content/input-form/input-form.component';
import { ResultsComponent } from './content/results/results.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'input-form',
        component: InputFormComponent,
      },
      {
        path: 'results',
        component: ResultsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
