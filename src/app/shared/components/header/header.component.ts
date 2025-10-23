import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage]
})
export class HeaderComponent {
  authService = inject(AuthService);
  isMenuOpen = signal(false);

  logoUrl = 'https://www.papihairdesign.sk/wp-content/uploads/2024/04/papihairdesign-logo.png';

  navLinks = [
    { path: '/', label: 'Domov' },
    { path: '/blog', label: 'Blog' },
    { path: '/pricing', label: 'Cenník' },
    { path: '/rezervacia', label: 'Rezervácia' },
    { path: '/about', label: 'O nás' },
    { path: '/contact', label: 'Kontakt' }
  ];

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
  
  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
