import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'virtual-try-on',
    loadComponent: () => import('./features/virtual-try-on/vto.component').then(c => c.VtoComponent),
    title: 'Virtual Try-On'
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then(c => c.ShopComponent),
    title: 'Shop'
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [authGuard],
    title: 'My Profile'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
