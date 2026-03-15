import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {NotFound} from './pages/not-found/not-found';
import {History} from './pages/history/history';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'WishFlix - Accueil'
  },
  {
    path: 'history',
    component: History,
    title: 'WishFlix - Fiche de jeu'
  },
  {
    path: '**',
    component: NotFound,
    title: "404 - Page indisponible"
  }
];
