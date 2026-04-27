import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  // Configurable WhatsApp number
  private readonly phoneNumber = signal('1234567890'); // Replace with actual number

  /**
   * Generates a deep link to WhatsApp with a pre-filled message.
   * @param tourTitle The title of the tour being discussed.
   * @param price The current price of the tour.
   * @returns A WhatsApp deep link URL.
   */
  generateLink(tourTitle: string, price: number): string {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const message = `Booking Inquiry: ${tourTitle}\nPrice: $${price}\nDate: ${today}\n\nHi! I'm interested in this tour. Is it still available?`;
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${this.phoneNumber()}?text=${encodedMessage}`;
  }

  /**
   * Updates the phone number if needed (e.g., from a configuration service).
   * @param newNumber The new WhatsApp number.
   */
  updatePhoneNumber(newNumber: string): void {
    this.phoneNumber.set(newNumber);
  }
}
