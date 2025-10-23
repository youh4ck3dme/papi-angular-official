import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);

  constructor() {
    const storedAuth = localStorage.getItem('isAuthenticated');
    this.isAuthenticated.set(storedAuth === 'true');
  }

  login() {
    this.isAuthenticated.set(true);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout() {
    this.isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
  }
}