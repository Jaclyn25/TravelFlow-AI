import { Injectable, signal, computed } from '@angular/core';

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  destination: string;
  budgetRange: 'budget' | 'mid' | 'luxury';
  style: 'adventure' | 'relaxation' | 'culture';
  itinerary: { day: number; title: string; content: string }[];
  seatsLeft: number;
  viewingCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private readonly tours = signal<Tour[]>([
    {
      id: '1',
      title: 'Bali Paradise Escape',
      subtitle: 'Tropical Bliss & Cultural Wonders',
      description: 'Experience the ultimate tropical getaway with a blend of serene beaches and vibrant cultural landmarks.',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000',
      destination: 'Bali, Indonesia',
      budgetRange: 'mid',
      style: 'relaxation',
      seatsLeft: 4,
      viewingCount: 12,
      itinerary: [
        { day: 1, title: 'Arrival & Beach Sunset', content: 'Arrive at Ngurah Rai International Airport. Transfer to your luxury villa in Seminyak. Evening sunset cocktails at a beachfront bar.' },
        { day: 2, title: 'Ubud Cultural Exploration', content: 'Visit the Sacred Monkey Forest, Ubud Palace, and the traditional art market. Lunch overlooking the Tegalalang Rice Terrace.' },
        { day: 3, title: 'Temple Trail & Spa', content: 'Full-day tour to Tanah Lot and Uluwatu temples. End the day with a relaxing 2-hour Balinese massage.' }
      ]
    },
    {
      id: '2',
      title: 'Moroccan Sands Adventure',
      subtitle: 'Atlas Mountains & Sahara Trek',
      description: 'Journey through the rugged Atlas Mountains and spend a night under the stars in the Sahara Desert.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1000',
      destination: 'Marrakech, Morocco',
      budgetRange: 'mid',
      style: 'adventure',
      seatsLeft: 2,
      viewingCount: 8,
      itinerary: [
        { day: 1, title: 'Marrakech Medina', content: 'Explore the bustling souks and Jemaa el-Fnaa square. Dinner in a traditional Riad.' },
        { day: 2, title: 'Atlas Mountains Pass', content: 'Drive through the Tizi n\'Tichka pass. Visit the Ait Benhaddou Kasbah (UNESCO site).' },
        { day: 3, title: 'Sahara Camel Trek', content: 'Ride camels into the Merzouga dunes. Overnight in a Berber desert camp with traditional music.' }
      ]
    },
    {
      id: '3',
      title: 'Greek Islands Odyssey',
      subtitle: 'Santorini & Mykonos Luxury',
      description: 'Sail across the Aegean Sea, exploring the iconic blue-domed churches and white-washed villages.',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000',
      destination: 'Santorini, Greece',
      budgetRange: 'luxury',
      style: 'culture',
      seatsLeft: 5,
      viewingCount: 15,
      itinerary: [
        { day: 1, title: 'Oia Sunset', content: 'Arrival in Santorini. Check-in to a caldera-view suite. Watch the world-famous sunset from Oia castle.' },
        { day: 2, title: 'Private Catamaran Cruise', content: 'Full-day sailing around the volcanic islands with snorkeling and fresh seafood lunch on board.' },
        { day: 3, title: 'Mykonos Nightlife', content: 'Transfer to Mykonos via high-speed ferry. Explore the Little Venice area and enjoy the vibrant nightlife.' }
      ]
    }
  ]);

  readonly allTours = this.tours.asReadonly();

  /**
   * Filters tours based on search criteria.
   */
  filterTours(destination: string, budget: string, style: string) {
    return computed(() => {
      return this.tours().filter(tour => {
        const matchDest = !destination || tour.destination.toLowerCase().includes(destination.toLowerCase());
        const matchBudget = !budget || tour.budgetRange === budget;
        const matchStyle = !style || tour.style === style;
        return matchDest && matchBudget && matchStyle;
      });
    });
  }

  /**
   * Retrieves a single tour by ID.
   */
  getTourById(id: string) {
    return computed(() => this.tours().find(t => t.id === id));
  }
}
