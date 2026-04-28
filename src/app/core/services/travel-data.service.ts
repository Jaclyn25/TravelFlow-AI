import { Injectable, signal, computed } from '@angular/core';

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  tourCount: number;
  region: string;
}

export interface Tour {
  id: string;
  destinationId: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: 'adventure' | 'relaxation' | 'culture' | 'luxury';
  rating: number;
  itinerary: { day: number; title: string; content: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  // Signals for the source of truth
  private readonly _destinations = signal<Destination[]>([
    {
      id: 'bali',
      name: 'Bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      description: 'The Island of the Gods, where spirituality meets tropical paradise.',
      tourCount: 2,
      region: 'Asia'
    },
    {
      id: 'santorini',
      name: 'Santorini',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000',
      description: 'Iconic white-washed buildings and breathtaking Aegean sunsets.',
      tourCount: 1,
      region: 'Europe'
    },
    {
      id: 'cairo',
      name: 'Cairo',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1000',
      description: 'The cradle of civilization, from the Pyramids to the bustling Khan el-Khalili.',
      tourCount: 1,
      region: 'Middle East'
    },
    {
      id: 'maldives',
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000',
      description: 'A scattered archipelago of pure indulgence and azure waters.',
      tourCount: 1,
      region: 'Asia'
    },
    {
      id: 'zermatt',
      name: 'Zermatt',
      image: 'https://images.unsplash.com/photo-1502901664654-20ce60e2898c?q=80&w=1000',
      description: 'Alpine majesty at the foot of the Matterhorn.',
      tourCount: 1,
      region: 'Europe'
    }
  ]);

  private readonly _tours = signal<Tour[]>([
    {
      id: 'ubud-soul',
      destinationId: 'bali',
      title: 'Ubud Soul Escape',
      subtitle: 'Tropical Bliss & Spiritual Awakening',
      description: 'Diving deep into the cultural heart of Bali with luxury eco-resorts and private temple tours.',
      price: 1299,
      duration: '7 Days',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      category: 'culture',
      rating: 4.9,
      itinerary: [
        { day: 1, title: 'Arrival & Flower Bath', content: 'VIP pickup and traditional Balinese welcome at your luxury villa.' },
        { day: 2, title: 'Rice Terrace Trek', content: 'Sunrise walk through Tegallalang with a private guide.' }
      ]
    },
    {
      id: 'bali-pulse',
      destinationId: 'bali',
      title: 'Bali Pulse Adventure',
      subtitle: 'Volcanoes & Hidden Waterfalls',
      description: 'An adrenaline-fueled journey through the rugged landscapes of Northern Bali.',
      price: 950,
      duration: '5 Days',
      image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1000',
      category: 'adventure',
      rating: 4.8,
      itinerary: [
        { day: 1, title: 'Mt. Batur Hike', content: 'Sunrise trek to the summit of an active volcano.' }
      ]
    },
    {
      id: 'greek-odyssey',
      destinationId: 'santorini',
      title: 'Greek Odyssey',
      subtitle: 'Cyclades Luxury Retreat',
      description: 'Sailing the caldera and tasting the volcanic wines of Santorini.',
      price: 2450,
      duration: '6 Days',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000',
      category: 'relaxation',
      rating: 5.0,
      itinerary: [{ day: 1, title: 'Fira Sunset', content: 'Arrival at your cliffside villa with private pool.' }]
    },
    {
      id: 'cairo-gems',
      destinationId: 'cairo',
      title: 'Pharaonic Legacy',
      subtitle: 'Pyramids & Hidden Tombs',
      description: 'Exclusive private access to the Giza plateau and the Egyptian Museum.',
      price: 1100,
      duration: '4 Days',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1000',
      category: 'culture',
      rating: 4.7,
      itinerary: [{ day: 1, title: 'Great Pyramids', content: 'Private sunrise tour before the crowds arrive.' }]
    },
    {
      id: 'maldives-serenity',
      destinationId: 'maldives',
      title: 'Maldives Serenity',
      subtitle: 'Water Villa Indulgence',
      description: 'Ultra-luxury overwater bungalow experience with private butler.',
      price: 4999,
      duration: '5 Days',
      image: 'https://images.unsplash.com/photo-1506929113670-b431182bf9ba?q=80&w=1000',
      category: 'luxury',
      rating: 5.0,
      itinerary: [{ day: 1, title: 'Seaplane Arrival', content: 'Check-in to your water villa with glass floors.' }]
    },
    {
      id: 'swiss-alps',
      destinationId: 'zermatt',
      title: 'Matterhorn Peak',
      subtitle: 'Alpine Luxury Ski',
      description: 'Luxury chalet stay with private ski guides and Michelin-starred dining.',
      price: 3200,
      duration: '6 Days',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
      category: 'adventure',
      rating: 4.9,
      itinerary: [{ day: 1, title: 'Chalet Welcome', content: 'Gourmet dinner by your private chef overlooking the peaks.' }]
    }
  ]);

  // Read-only signals
  readonly destinations = this._destinations.asReadonly();
  readonly tours = this._tours.asReadonly();

  // Filters state
  selectedDestinationId = signal<string | null>(null);
  selectedCategory = signal<string | null>(null);

  // Filtered computed signal
  filteredTours = computed(() => {
    const destId = this.selectedDestinationId();
    const category = this.selectedCategory();
    
    return this._tours().filter(t => {
      const matchDest = !destId || t.destinationId === destId;
      const matchCat = !category || t.category === category;
      return matchDest && matchCat;
    });
  });

  getDestinationById(id: string) {
    return computed(() => this._destinations().find(d => d.id === id));
  }

  getTourById(id: string) {
    return computed(() => this._tours().find(t => t.id === id));
  }
}
