import { Routes } from '@angular/router';
import { authGuard } from './core/guards';
import { userGuard } from './core/guards/user.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Domov',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'gallery', // New route for the gallery
    title: 'Portfolio',
    loadComponent: () => import('./shared/components/gallery/gallery.component').then(c => c.GalleryComponent)
  },
  {
    path: 'shop',
    title: 'Shop',
    loadComponent: () => import('./features/shop/shop.component').then(c => c.ShopComponent)
  },
  {
    path: 'cart',
    title: 'Nákupný košík',
    loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent)
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
    path: 'virtual-try-on',
    title: 'Virtuálne Vyskúšanie',
    loadComponent: () => import('./features/virtual-try-on/vto.component').then(c => c.VtoComponent),
     canActivate: [userGuard],
  },
  {
    path: 'profile',
    title: 'Môj Profil',
    loadComponent: () => import('./features/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [userGuard],
  },
  {
    path: 'privacy',
    title: 'Nastavenia Súkromia',
    loadComponent: () => import('./features/privacy/privacy.component').then(c => c.PrivacyComponent),
    canActivate: [userGuard],
  },
  {
    path: 'admin-login', // Renamed for clarity
    title: 'Admin Prihlásenie',
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
