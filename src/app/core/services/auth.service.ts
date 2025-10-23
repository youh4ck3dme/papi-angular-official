import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);

  constructor() {
    // In a real app, you would check localStorage or a token here
  }

  login() {
    // Simulate a login
    this.isAuthenticated.set(true);
  }

  logout() {
    this.isAuthenticated.set(false);
  }
}
