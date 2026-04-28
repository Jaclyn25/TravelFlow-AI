import { Injectable, signal, computed } from '@angular/core';

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  destination: string;
  region: 'Europe' | 'Asia' | 'Middle East' | 'Africa' | 'Americas';
  budgetRange: 'budget' | 'mid' | 'luxury';
  style: 'adventure' | 'relaxation' | 'culture' | 'luxury';
  rating: number;
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
      region: 'Asia',
      budgetRange: 'mid',
      style: 'culture',
      rating: 4.9,
      seatsLeft: 3,
      viewingCount: 42,
      itinerary: [
        { day: 1, title: 'Arrival & Flower Bath', content: 'VIP pickup and traditional Balinese welcome at your luxury villa.' },
        { day: 2, title: 'Rice Terrace Trek', content: 'Sunrise walk through Tegallalang with a private guide.' }
      ]
    },
    {
      id: 'maldives-serenity',
      title: 'Maldives Serenity',
      subtitle: 'Private Island Luxury',
      description: 'Ultra-exclusive water villa experience with private butler and coral reef snorkeling.',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000',
      destination: 'Malé, Maldives',
      region: 'Asia',
      budgetRange: 'luxury',
      style: 'luxury',
      rating: 5.0,
      seatsLeft: 2,
      viewingCount: 210,
      itinerary: [{ day: 1, title: 'Seaplane Arrival', content: 'VIP transfer to your overwater bungalow.' }]
    },
    {
      id: 'swiss-alps',
      title: 'Swiss Alps adventure',
      subtitle: 'Heights of Zermatt',
      description: 'Luxury ski-in ski-out experience with Matterhorn views and private Alpine guides.',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1502901664654-20ce60e2898c?q=80&w=1000',
      destination: 'Zermatt, Switzerland',
      region: 'Europe',
      budgetRange: 'luxury',
      style: 'adventure',
      rating: 4.8,
      seatsLeft: 4,
      viewingCount: 88,
      itinerary: [{ day: 1, title: 'Alpine Chalet', content: 'Check-in to your private chalet with heated infinity pool.' }]
    },
    {
      id: 'cairo-gems',
      title: 'Cairo Historical Gems',
      subtitle: 'Pharaonic Legacy',
      description: 'Private access to the Grand Egyptian Museum and luxury Nile dinner cruise.',
      price: 1100,
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1000',
      destination: 'Cairo, Egypt',
      region: 'Middle East',
      budgetRange: 'mid',
      style: 'culture',
      rating: 4.7,
      seatsLeft: 12,
      viewingCount: 145,
      itinerary: [{ day: 1, title: 'Great Pyramids', content: 'Sunrise private tour of Giza plateau.' }]
    },
    {
      id: 'greek-odyssey',
      title: 'Greek Odyssey Retreat',
      subtitle: 'Cyclades Luxury Catamaran',
      description: 'Explore the hidden gems of the Cyclades on a private catamaran with a personal chef.',
      price: 2450,
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000',
      destination: 'Santorini, Greece',
      region: 'Europe',
      budgetRange: 'luxury',
      style: 'relaxation',
      rating: 4.9,
      seatsLeft: 5,
      viewingCount: 128,
      itinerary: [{ day: 1, title: 'Sunset Oia', content: 'Arrival at your cliffside villa and private sunset dinner.' }]
    },
    {
      id: 'moroccan-red',
      title: 'Moroccan Red',
      subtitle: 'Sahara Desert & Marrakech',
      description: 'A sensory journey through the medinas and a luxury desert camp in the Sahara.',
      price: 899,
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1000',
      destination: 'Marrakech, Morocco',
      region: 'Middle East',
      budgetRange: 'mid',
      style: 'adventure',
      rating: 4.6,
      seatsLeft: 8,
      viewingCount: 56,
      itinerary: [{ day: 1, title: 'Majorelle Blue', content: 'Guided tour of the iconic gardens and lunch in the Medina.' }]
    }
  ]);

  readonly allTours = this.tours.asReadonly();

  filterTours(params: { destination?: string, budget?: string, style?: string, region?: string }) {
    return computed(() => {
      return this.tours().filter(tour => {
        const matchDest = !params.destination || tour.destination.toLowerCase().includes(params.destination.toLowerCase());
        const matchBudget = !params.budget || tour.budgetRange === params.budget;
        const matchStyle = !params.style || tour.style === params.style;
        const matchRegion = !params.region || tour.region === params.region;
        return matchDest && matchBudget && matchStyle && matchRegion;
      });
    });
  }

  getTourById(id: string) {
    return computed(() => this.tours().find(t => t.id === id));
  }
}
