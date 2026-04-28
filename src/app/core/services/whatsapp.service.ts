import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly phoneNumber = signal<string>('201234567890'); // Agency Phone (Digits Only)

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
    return this.generateLink(message);
  }

  sendGeneralInquiry(message: string) {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.generateLink(message);
      window.open(url, '_blank');
    }
  }

  generateLink(message: string, price?: number): string {
    const cleanPhone = this.phoneNumber().replace(/\D/g, ''); // Ensure digits only
    const finalMessage = price !== undefined ? `${message} - Price: $${price}` : message;
    const encodedMsg = encodeURIComponent(finalMessage);
    return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  }

  updatePhoneNumber(newNumber: string) {
    this.phoneNumber.set(newNumber);
  }
}
