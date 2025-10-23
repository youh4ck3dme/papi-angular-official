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

  // WARNING: This is a client-side only password check and is NOT secure.
  // In a real production application, authentication should always be handled
  // by a secure backend server. This is for demonstration purposes only.
  login(password: string): boolean {
    if (password === "23513900") {
      this.isAuthenticated.set(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
  }
}
