import { Injectable, NgZone, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { UserProfile } from '../models';
import { NotificationService } from './notification.service';
import { finalize } from 'rxjs';

// Global google object from the GSI script
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ngZone = inject(NgZone);
  private firebaseService = inject(FirebaseService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  private readonly CLIENT_ID = '329729972070-onios6v570132o1i31ooig26d4vqpus0.apps.googleusercontent.com';
  
  private tokenClient: any;
  
  currentUser = signal<UserProfile | null>(null);
  
  constructor() {
    this.initializeGsiClient();
  }

  private initializeGsiClient() {
    setTimeout(() => {
      if (typeof google !== 'undefined') {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: this.CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          callback: (tokenResponse: any) => {
            this.ngZone.run(() => {
              if (tokenResponse && tokenResponse.access_token) {
                this.fetchAndSetUserProfile(tokenResponse.access_token);
              }
            });
          },
        });
      }
    }, 500);
  }

  signInWithGoogle() {
    if (this.tokenClient) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      console.error('Google API client not initialized.');
      this.notificationService.show('Chyba pri prihlasovaní. Skúste prosím znova.', 'error');
      this.initializeGsiClient();
    }
  }

  signOut() {
    this.currentUser.set(null);
    // In a real app, you would also revoke the token.
    this.notificationService.show('Boli ste úspešne odhlásený.', 'info');
    this.router.navigate(['/']);
  }

  private fetchAndSetUserProfile(accessToken: string) {
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(googleProfile => {
      // Check if user exists in our DB, otherwise create them.
      this.firebaseService.getUserProfile(googleProfile.sub)
        .pipe(finalize(() => this.notificationService.show(`Vitajte, ${googleProfile.name}!`, 'success')))
        .subscribe(dbProfile => {
          if (dbProfile) {
            this.currentUser.set(dbProfile);
          } else {
            const newUser: UserProfile = {
              uid: googleProfile.sub,
              name: googleProfile.name,
              email: googleProfile.email,
              picture: googleProfile.picture,
              loyaltyPoints: 0,
              privacyConsent: {
                camera: false,
                analytics: false,
                // This consent is required for the service to function for a logged-in user.
                personalData: true, 
                marketing: false,
                lastUpdated: new Date()
              }
            };
            this.firebaseService.createUserProfile(newUser).subscribe(createdUser => {
              this.currentUser.set(createdUser);
            });
          }
        });
    })
    .catch(err => {
        console.error("Error fetching user profile", err);
        this.notificationService.show('Nepodarilo sa načítať profil.', 'error');
    });
  }
}