import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simple signal-based auth state
  currentUser = signal<{ name: string; email: string } | null>(null);

  login(name: string, email: string) {
    this.currentUser.set({ name, email });
    console.log('[Auth] User logged in:', name);
  }

  logout() {
    this.currentUser.set(null);
  }

  isLoggedIn() {
    return !!this.currentUser();
  }
}
