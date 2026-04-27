import { Component, inject, signal, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService, Tour } from '../../core/services/tour.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { UrgencyBadgeComponent } from '../../shared/components/urgency-badge/urgency-badge';
import { CountdownTimerComponent } from '../../shared/components/countdown-timer/countdown-timer';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule, UrgencyBadgeComponent, CountdownTimerComponent, SkeletonLoaderComponent],
  templateUrl: './tour-details.html',
})
export class TourDetailsComponent {
  // Input from routing (Angular 16+ feature)
  tourId = input<string>('1'); 
  
  private tourService = inject(TourService);
  whatsappService = inject(WhatsAppService);

  tour = signal<Tour | undefined>(undefined);
  isLoading = signal(true);
  expandedDay = signal<number | null>(1);

  constructor() {
    // Reactive effect to update tour data when tourId changes
    effect(() => {
      const id = this.tourId();
      if (id) {
        this.isLoading.set(true);
        const foundTour = this.tourService.getTourById(id)();
        this.tour.set(foundTour);
        setTimeout(() => this.isLoading.set(false), 1500);
      }
    });
  }

  printItinerary() {
    window.print();
  }

  /**
   * Toggles the visibility of an itinerary day.
   */
  toggleDay(day: number) {
    this.expandedDay.update(curr => curr === day ? null : day);
  }
}
