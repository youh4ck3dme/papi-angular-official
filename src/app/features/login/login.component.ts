import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  authService = inject(AuthService);
  // Fix: Explicitly type the injected Router to resolve type inference issues.
  router: Router = inject(Router);
  notificationService = inject(NotificationService);

  password = signal('');

  login() {
    if (this.authService.login(this.password())) {
      this.router.navigate(['/dashboard']);
    } else {
      this.notificationService.show('Nesprávne heslo!', 'error');
      this.password.set(''); // Clear the password field on failure
    }
  }
}
