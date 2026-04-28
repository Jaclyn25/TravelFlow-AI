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
  private _wishlist = signal<string[]>([]); // Array of tour IDs
  private _inquiries = signal<{id: string, date: string, tourTitle: string}[]>([]);

  // Public computed signals
  user = computed(() => this.currentUser());
  isAuthenticated = computed(() => !!this.currentUser());
  wishlist = computed(() => this._wishlist());
  inquiries = computed(() => this._inquiries());

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  toggleWishlist(tourId: string) {
    this._wishlist.update(list => 
      list.includes(tourId) ? list.filter(id => id !== tourId) : [...list, tourId]
    );
  }

  addInquiry(tourTitle: string) {
    this._inquiries.update(list => [
      { id: Math.random().toString(36), date: new Date().toLocaleDateString(), tourTitle },
      ...list
    ]);
  }

  login(email: string, pass: string) {
    // Simulate API call
    this.currentUser.set({
      id: '1',
      name: 'Traveler One',
      email: email,
      avatar: 'https://i.pravatar.cc/150?u=1'
    });
    // Add some mock data
    this._wishlist.set(['1', '2']);
    this._inquiries.set([
      { id: 'q1', date: '2026-04-20', tourTitle: 'Luxury Escape to Bali' }
    ]);
  }

  logout() {
    this.currentUser.set(null);
    this._wishlist.set([]);
    this._inquiries.set([]);
  }
}
