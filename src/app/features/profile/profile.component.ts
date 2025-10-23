import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../core/services/gemini.service';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ProfileComponent {
  geminiService = inject(GeminiService);
  authService = inject(AuthService);
  router = inject(Router);
  
  recommendations = signal<string | null>(null);
  isLoading = signal(false);

  // Mock visit history
  visitHistory = [
    'Color treatment (Balayage)',
    'Keratin Smoothing Treatment',
    'Deep Conditioning Mask'
  ];

  getRecommendations() {
    this.isLoading.set(true);
    this.recommendations.set(null);
    
    this.geminiService.getRecommendations(this.visitHistory)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (result) => {
          this.recommendations.set(result);
        },
        error: (err) => {
           this.recommendations.set('Sorry, we could not fetch recommendations at this time.');
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
