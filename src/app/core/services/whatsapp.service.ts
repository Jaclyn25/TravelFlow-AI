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
  /**
   * Generates a complex link for the Live Trip Builder.
   */
  buildItineraryLink(details: { destination: string, duration: string, budget: string, vibe: string }): string {
    const message = `Hi! I just used the Live Trip Builder and I want to book:
- Destination: ${details.destination}
- Duration: ${details.duration}
- Budget: ${details.budget}
- Vibe: ${details.vibe}

Can we finalize the itinerary?`;
    return `https://wa.me/${this.phoneNumber()}?text=${encodeURIComponent(message)}`;
  }

  sendGeneralInquiry(message: string) {
    const url = `https://wa.me/${this.phoneNumber()}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  updatePhoneNumber(newNumber: string) {
    this.phoneNumber.set(newNumber);
  }
}
