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

  logoUrl = 'https://services.bookio.com/image/e123babb-6e76-48d1-b1a1-93ba592c7125';

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
