import { Component, ChangeDetectionStrategy, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class HeaderComponent {
  authService = inject(AuthService);
  isMenuOpen = signal(false);

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/virtual-try-on', label: 'Virtual Try-On' },
    { path: '/shop', label: 'Shop' },
    { path: '/profile', label: 'Profile' }
  ];

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
  
  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
