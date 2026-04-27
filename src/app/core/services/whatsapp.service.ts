import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  private readonly phoneNumber = signal<string>('+201234567890'); // Agency Phone

  /**
   * Generates a dynamic WhatsApp deep link for a specific tour.
   * @param tourName The name of the tour.
   * @param price The tour price.
   */
  generateLink(tourName: string, price: number): string {
    const message = `Hi! I am interested in ${tourName} for $${price}. Can I get more details?`;
    return `https://wa.me/${this.phoneNumber()}?text=${encodeURIComponent(message)}`;
  }

  updatePhoneNumber(newNumber: string) {
    this.phoneNumber.set(newNumber);
  }
}
