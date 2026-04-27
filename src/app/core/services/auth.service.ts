import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal-based state
  private currentUser = signal<User | null>(null);
  
  // Public computed signals
  user = computed(() => this.currentUser());
  isAuthenticated = computed(() => !!this.currentUser());

  login(email: string, pass: string) {
    // Simulate API call
    setTimeout(() => {
      this.currentUser.set({
        id: '1',
        name: 'Traveler One',
        email: email,
        avatar: 'https://i.pravatar.cc/150?u=1'
      });
    }, 1000);
  }

  logout() {
    this.currentUser.set(null);
  }
}
