import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  /**
   * Tracks a custom event (e.g., Lead Generated, Search Performed).
   */
  trackEvent(eventName: string, properties?: any) {
    // Simulate tracking
    console.log(`%c[Analytics] ${eventName}`, 'color: #3b82f6; font-weight: bold', properties);
    
    // Example integration for GA4:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, properties);
    // }
  }
}
