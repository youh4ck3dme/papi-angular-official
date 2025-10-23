import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class DashboardComponent {
  authService = inject(AuthService);
  // Fix: Explicitly type the injected Router to resolve type inference issues.
  router: Router = inject(Router);

  navLinks = [
    { path: '/dashboard/customers', label: 'Zákazníci' },
    { path: '/dashboard/products', label: 'Produkty' },
    { path: '/dashboard/settings', label: 'Nastavenia' }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
