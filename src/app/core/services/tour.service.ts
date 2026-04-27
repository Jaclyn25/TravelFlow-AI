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
      id: 'ubud-soul',
      title: 'Ubud Soul Escape',
      subtitle: 'Tropical Bliss & Spiritual Awakening',
      description: 'Diving deep into the cultural heart of Bali with luxury eco-resorts and private temple tours.',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      destination: 'Bali, Indonesia',
      budgetRange: 'mid',
      style: 'culture',
      seatsLeft: 3,
      viewingCount: 42,
      itinerary: [
        { day: 1, title: 'Arrival & Flower Bath', content: 'VIP pickup and traditional Balinese welcome at your luxury villa.' },
        { day: 2, title: 'Rice Terrace Trek', content: 'Sunrise walk through Tegallalang with a private guide.' }
      ]
    },
    {
      id: 'greek-odyssey',
      title: 'Greek Odyssey Retreat',
      subtitle: 'Cyclades Luxury Catamaran',
      description: 'Explore the hidden gems of the Cyclades on a private catamaran with a personal chef.',
      price: 2450,
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000',
      destination: 'Santorini, Greece',
      budgetRange: 'luxury',
      style: 'relaxation',
      seatsLeft: 5,
      viewingCount: 128,
      itinerary: [
        { day: 1, title: 'Sunset Oia', content: 'Arrival at your cliffside villa and private sunset dinner.' }
      ]
    },
    {
      id: 'moroccan-red',
      title: 'Moroccan Red',
      subtitle: 'Sahara Desert & Marrakech',
      description: 'A sensory journey through the medinas and a luxury desert camp in the Sahara.',
      price: 899,
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1000',
      destination: 'Marrakech, Morocco',
      budgetRange: 'mid',
      style: 'adventure',
      seatsLeft: 8,
      viewingCount: 56,
      itinerary: [
        { day: 1, title: 'Majorelle Blue', content: 'Guided tour of the iconic gardens and lunch in the Medina.' }
      ]
    }
  ]);

  readonly allTours = this.tours.asReadonly();

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

  getTourById(id: string) {
    return computed(() => this.tours().find(t => t.id === id));
  }
}
