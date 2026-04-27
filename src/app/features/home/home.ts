import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SmartTripFinderComponent } from './components/smart-trip-finder/smart-trip-finder';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SmartTripFinderComponent],
  template: `
    <div class="min-h-screen bg-slate-50">
      <!-- Immersive Hero Section -->
      <section class="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <!-- Hero Image with Overlay -->
        <div class="absolute inset-0 z-0">
          <img src="assets/hero.png" class="w-full h-full object-cover scale-110 animate-pulse-slow" alt="Hero Travel">
          <div class="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-slate-50"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="fade-in-up">
              <span class="inline-block bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg shadow-orange-500/20">
                Premium Travel Experience
              </span>
              <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                Your Next <br><span class="text-teal-600">Great Adventure</span> Starts Here.
              </h1>
              <p class="text-xl text-slate-200 font-medium max-w-lg leading-relaxed mb-10 text-balance">
                Bespoke travel experiences curated by AI to match your soul's craving for adventure. Discover worlds you never knew existed.
              </p>
              <div class="flex items-center gap-6">
                <button class="btn-accent px-10 py-5">View Destinations</button>
                <div class="hidden md:flex flex-col">
                  <div class="flex -space-x-3 mb-2">
                    <img src="https://i.pravatar.cc/150?u=1" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                    <img src="https://i.pravatar.cc/150?u=2" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                    <img src="https://i.pravatar.cc/150?u=3" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                  </div>
                  <span class="text-[10px] font-black text-white uppercase tracking-widest">50k+ Happy Travelers</span>
                </div>
              </div>
            </div>

            <!-- Smart Finder Search Bar / Form -->
            <div class="fade-in-up" style="animation-delay: 0.2s">
              <div class="glass-dark p-8 rounded-[2.5rem] shadow-2xl border-white/10">
                <app-smart-trip-finder></app-smart-trip-finder>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Grid Section -->
      <section class="max-w-7xl mx-auto px-6 py-32">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
          <div>
            <h2 class="text-5xl font-black text-navy-900 tracking-tighter">Explore Tours</h2>
            <p class="text-slate-400 font-bold mt-3 text-lg">Our AI-Curated Masterpieces for 2026</p>
          </div>
          <button class="bg-white border-2 border-slate-100 px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-teal-600 hover:text-teal-600 transition-all shadow-sm">
             Browse All Tours
          </button>
        </div>

        <!-- Premium Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-8 h-auto md:h-[800px]">
          <!-- Featured: Ubud -->
          <div class="md:col-span-2 md:row-span-2 card-bento group cursor-pointer" (click)="navigate('ubud-soul')">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
            <div class="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent"></div>
            
            <!-- Urgency Badge -->
            <div class="absolute top-8 left-8">
               <span class="badge-urgency">ONLY 3 SEATS LEFT!</span>
            </div>

            <div class="absolute bottom-10 left-10 right-10">
               <div class="flex items-center gap-2 mb-4">
                 <span class="bg-teal-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Adventure</span>
                 <span class="bg-navy-900/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-black tracking-widest">$1,299 pp</span>
               </div>
               <h3 class="text-5xl font-black text-white tracking-tighter leading-none mb-6">Ubud Soul Escape</h3>
               <button class="btn-accent py-3 text-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">View Details</button>
            </div>
          </div>

          <!-- Vertical: Greek -->
          <div class="md:col-span-1 md:row-span-2 card-bento group cursor-pointer" (click)="navigate('greek-odyssey')">
            <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
            <div class="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent"></div>
            
            <div class="absolute bottom-10 left-10">
               <span class="badge-urgency mb-4 inline-block">HOT DEAL</span>
               <h3 class="text-3xl font-black text-white tracking-tighter leading-tight mb-4 text-balance">Greek Odyssey Retreat</h3>
               <div class="text-teal-400 font-black text-xl mb-6">$2,450</div>
               <button class="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn">
                 Explore Now <span class="group-hover/btn:translate-x-2 transition-transform">→</span>
               </button>
            </div>
          </div>

          <!-- Horizontal: Morocco -->
          <div class="md:col-span-1 md:row-span-1 card-bento group cursor-pointer" (click)="navigate('moroccan-red')">
            <img src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1000" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
            <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div>
                 <h3 class="text-2xl font-black text-white tracking-tighter">Moroccan Red</h3>
                 <span class="text-teal-400 font-bold text-[10px] uppercase tracking-widest">Cultural Immersion</span>
               </div>
               <div class="text-white font-black">$899</div>
            </div>
          </div>

          <!-- Insight Card -->
          <div class="md:col-span-1 md:row-span-1 rounded-[3rem] p-10 bg-gradient-to-br from-navy-900 to-teal-800 flex flex-col justify-between shadow-2xl relative overflow-hidden">
             <div class="absolute -top-10 -right-10 w-32 h-32 bg-teal-600/20 rounded-full blur-2xl"></div>
             <div class="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <div>
                <h4 class="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-3">AI Recommendation</h4>
                <p class="text-2xl font-black text-white tracking-tighter leading-tight">Tailored to your budget & travel style.</p>
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
