import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, CartService, UserService } from '../../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage]
})
export class HeaderComponent {
  authService = inject(AuthService); // For admin
  userService = inject(UserService); // For customers
  cartService = inject(CartService);

  isMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

  logoUrl = 'https://services.bookio.com/image/e123babb-6e76-48d1-b1a1-93ba592c7125';

  navLinks = [
    { path: '/', label: 'Domov' },
    { path: '/gallery', label: 'Portfolio' },
    { path: '/virtual-try-on', label: 'Virtuálne Vyskúšanie' },
    { path: '/shop', label: 'Shop' },
    { path: '/blog', label: 'Blog' },
    { path: '/pricing', label: 'Cenník' },
    { path: '/rezervacia', label: 'Rezervácia' },
    { path: '/about', label: 'O nás' },
    { path: '/contact', label: 'Kontakt' }
  ];

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
    if(this.isProfileMenuOpen()) {
        this.isProfileMenuOpen.set(false);
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen.update(value => !value);
  }
  
  closeMenu() {
    this.isMenuOpen.set(false);
    this.isProfileMenuOpen.set(false);
  }

  login() {
    this.userService.signInWithGoogle();
    this.closeMenu();
  }

  logout() {
    this.userService.signOut();
    this.closeMenu();
  }
}