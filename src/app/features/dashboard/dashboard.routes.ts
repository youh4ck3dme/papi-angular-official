import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers'
  },
  {
    path: 'customers',
    title: 'Zákazníci',
    loadComponent: () => import('./customers/customers.component').then(c => c.CustomersComponent)
  },
  {
    path: 'products',
    title: 'Produkty',
    loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent)
  },
  {
    path: 'settings',
    title: 'Nastavenia',
    loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent)
  }
];
