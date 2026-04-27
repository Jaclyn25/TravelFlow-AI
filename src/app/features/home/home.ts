import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SmartTripFinderComponent } from './components/smart-trip-finder/smart-trip-finder';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SmartTripFinderComponent],
  template: `
    <div class="min-h-screen bg-gray-50 pt-32 pb-24">
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-6 mb-32 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="fade-in-up">
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              <span class="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
              Live: AI Trip Planner v2.0
            </div>
            <h1 class="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-10">
              Future of <br><span class="text-blue-600">Travel</span> is AI.
            </h1>
            <p class="text-xl text-gray-500 font-bold max-w-md leading-relaxed mb-12">
              Bespoke travel experiences curated by artificial intelligence. Just choose your vibe, and we'll handle the rest.
            </p>
            <div class="flex flex-wrap items-center gap-8">
               <button class="bg-gray-900 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-2xl shadow-gray-300">
                  Join The Waitlist
               </button>
               <div class="flex flex-col">
                  <div class="flex -space-x-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-blue-600 border-4 border-white"></div>
                    <div class="w-10 h-10 rounded-full bg-indigo-600 border-4 border-white"></div>
                    <div class="w-10 h-10 rounded-full bg-emerald-600 border-4 border-white"></div>
                  </div>
                  <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">50k+ Early Adopters</span>
               </div>
            </div>
          </div>

          <div class="fade-in-up" style="animation-delay: 0.2s">
            <app-smart-trip-finder></app-smart-trip-finder>
          </div>
        </div>
        
        <!-- Decoration background -->
        <div class="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10"></div>
      </section>

      <!-- Bento Grid Section -->
      <section class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
          <div>
            <h2 class="text-4xl font-black text-gray-900 tracking-tighter">Trending Now</h2>
            <p class="text-gray-400 font-bold mt-2 text-lg">Curated destinations for the modern minimalist</p>
          </div>
          <button class="bg-white border border-gray-100 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
             Explore All
          </button>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-8 h-[1200px] md:h-[700px]">
          <!-- Large Card -->
          <div class="md:col-span-2 md:row-span-2 group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:shadow-blue-200" (click)="navigate('1')">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div class="absolute bottom-10 left-10 right-10">
               <span class="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">New Collection</span>
               <h3 class="text-5xl font-black text-white tracking-tighter leading-none mb-4">Ubud Soul Escape</h3>
               <p class="text-white/70 font-bold text-lg leading-relaxed max-w-sm">Diving deep into the cultural heart of Bali.</p>
            </div>
          </div>

          <!-- Medium Card -->
          <div class="md:col-span-1 md:row-span-1 group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-xl" (click)="navigate('2')">
            <img src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-8 left-8">
               <h3 class="text-2xl font-black text-white tracking-tighter">Moroccan Red</h3>
               <span class="text-blue-400 font-bold text-xs">Adventure Ready</span>
            </div>
          </div>

          <!-- Vertical Card -->
          <div class="md:col-span-1 md:row-span-2 group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-xl" (click)="navigate('3')">
            <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div class="absolute bottom-10 left-10">
               <div class="w-12 h-1 bg-blue-600 mb-6"></div>
               <h3 class="text-3xl font-black text-white tracking-tighter leading-tight mb-2">Greek<br>Odyssey</h3>
               <p class="text-white/60 font-bold text-xs uppercase tracking-widest leading-none">Luxury Retreat</p>
            </div>
          </div>

          <!-- Info Card -->
          <div class="md:col-span-1 md:row-span-1 group relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:rotate-1">
            <div class="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex flex-col justify-between">
               <div class="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <div>
                  <div class="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Exclusive</div>
                  <div class="text-3xl font-black text-white tracking-tighter leading-[0.9]">Unlock<br>Unseen<br>Worlds.</div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HomeComponent {
  private router = inject(Router);

  navigate(id: string) {
    this.router.navigate(['/tour', id]);
  }
}
