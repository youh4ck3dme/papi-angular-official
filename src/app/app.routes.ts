import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Domov',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'blog',
    title: 'Blog',
    loadComponent: () => import('./features/blog/blog-list.component').then(c => c.BlogListComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/blog-post.component').then(c => c.BlogPostComponent)
  },
  {
    path: 'pricing',
    title: 'Cenník',
    loadComponent: () => import('./features/pricing/pricing.component').then(c => c.PricingComponent)
  },
  {
    path: 'rezervacia',
    title: 'Online Rezervácia',
    loadComponent: () => import('./features/booking/booking.component').then(c => c.BookingComponent)
  },
  {
    path: 'about',
    title: 'O nás',
    loadComponent: () => import('./features/about/about.component').then(c => c.AboutComponent)
  },
  {
    path: 'contact',
    title: 'Kontakt',
    loadComponent: () => import('./features/contact/contact.component').then(c => c.ContactComponent)
  },
  {
    path: 'login',
    title: 'Prihlásenie',
    loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES),
    title: 'Dashboard'
  },
  {
    path: 'admin',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'papihairsalon',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
