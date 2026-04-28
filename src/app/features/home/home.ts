import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SmartTripFinderComponent } from './components/smart-trip-finder/smart-trip-finder';
import { TourService } from '../../core/services/tour.service';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SmartTripFinderComponent, SkeletonLoaderComponent],
  template: `
    <div class="min-h-screen bg-white dark:bg-navy-950 transition-colors duration-700 selection:bg-accent selection:text-navy-900">
      <!-- Mega Hero Section -->
      <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <!-- Dramatic Background -->
        <div class="absolute inset-0 z-0">
          <img src="assets/hero.png" class="w-full h-full object-cover scale-100 animate-subtle-zoom opacity-90 dark:opacity-60" alt="Bespoke Luxury Travel">
          <div class="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-white dark:to-navy-950"></div>
          <div class="absolute inset-0 bg-navy-950/20 backdrop-brightness-75"></div>
        </div>

        <!-- Floating Search Bar (Top Fixed on Scroll) - Logic to be added via Directive or Scroll Listener -->
        <div class="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6 transition-all duration-500" 
             [class.opacity-0]="isTop()" [class.translate-y-[-100px]]="isTop()">
           <div class="glass-dark border-white/10 p-2 rounded-full shadow-2xl flex items-center gap-4">
              <div class="pl-6 text-accent">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" placeholder="Search your next destination..." class="bg-transparent border-none outline-none text-white font-medium text-sm w-full placeholder:text-slate-500">
              <button class="bg-accent text-navy-900 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Explore</button>
           </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
            <div class="animate-fade-in-up">
              <span class="inline-block px-6 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-glow">
                Collect Moments, Not Things
              </span>
              <h1 class="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.85] mb-12 font-serif">
                Bespoke <br><span class="text-accent italic font-light">Journeys</span>
              </h1>
              <p class="text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed mb-16 text-balance opacity-90">
                Experience the world's most exclusive destinations through AI-curated itineraries designed for the modern pioneer.
              </p>
              
              <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
                <button routerLink="/archive" class="btn-primary group relative overflow-hidden">
                  <span class="relative z-10">Start Your Discovery</span>
                  <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
                <div class="flex items-center gap-4 px-8 py-4 glass-dark rounded-2xl border-white/10 group cursor-pointer hover:border-accent/30 transition-all">
                  <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                  </div>
                  <div class="text-left">
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Watch Film</div>
                    <div class="text-xs font-bold text-white uppercase tracking-widest">Uncharted Worlds</div>
                  </div>
                </div>
              </div>

              <!-- Animated Scroll Badge -->
              <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <div class="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
                <span class="text-[9px] font-black text-accent uppercase tracking-[0.5em] mt-2">Scroll</span>
              </div>
            </div>
        </div>
      </section>

      <!-- Featured Destinations Preview -->
      <section class="max-w-7xl mx-auto px-6 py-40">
        <div class="flex flex-col items-center text-center mb-24">
          <span class="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Selection</span>
          <h2 class="text-5xl md:text-7xl font-black text-navy-900 dark:text-white font-serif tracking-tighter mb-6">Signature Experiences</h2>
          <div class="w-24 h-[1px] bg-accent/30"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          @if (isLoading()) {
            @for (i of [1,2,3]; track i) {
               <div class="col-span-1 md:col-span-4 flex flex-col gap-6 p-8 glass rounded-[3rem]">
                 <app-skeleton-loader height="400px" rounded="3xl"></app-skeleton-loader>
               </div>
            }
          } @else {
            @for (tour of tours(); track tour.id; let i = $index) {
              <div [class]="'group cursor-pointer relative rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-accent/10 border border-slate-100 dark:border-white/5 ' + (i === 0 ? 'md:col-span-8 h-[600px]' : (i === 1 ? 'md:col-span-4 h-[600px]' : 'md:col-span-6 h-[500px]'))" 
                   (click)="navigate(tour.id)">
                <img [src]="tour.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent"></div>
                
                <div class="absolute top-10 right-10 z-20">
                   <div class="bg-accent shadow-glow text-navy-900 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all group-hover:scale-110">{{ tour.viewingCount }} viewing</div>
                </div>

                <div class="absolute bottom-12 left-12 right-12 z-20">
                   <div class="flex items-center gap-4 mb-6">
                     <span class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{{ tour.style }}</span>
                     <span class="text-accent font-black text-lg tracking-tighter">$ {{ tour.price }}</span>
                   </div>
                   <h3 class="text-4xl md:text-5xl font-black text-white font-serif tracking-tighter leading-tight mb-8">{{ tour.title }}</h3>
                   <div class="overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                     <button class="bg-accent text-navy-900 font-black text-[10px] px-10 py-4 rounded-2xl uppercase tracking-widest shadow-2xl">Begin Your Journey</button>
                   </div>
                </div>

                <!-- Hover Overlay Glow -->
                <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            }
          }
        </div>
        
        <div class="mt-24 text-center">
          <button routerLink="/archive" class="inline-flex items-center gap-6 px-12 py-5 rounded-full border border-slate-200 dark:border-white/10 text-[11px] font-black uppercase tracking-[0.3em] hover:border-accent hover:text-accent transition-all dark:text-slate-400 group">
            Explore Full Collection
            <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </section>

      <!-- Live Trip Builder Preview -->
      <section class="max-w-7xl mx-auto px-6 py-20">
         <div class="glass-dark border-white/5 rounded-[4rem] p-16 md:p-32 relative overflow-hidden">
            <div class="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 blur-[150px] rounded-full"></div>
            <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 class="text-4xl md:text-6xl font-black text-white font-serif tracking-tighter mb-8 leading-tight">Design Your Own <br><span class="text-accent italic font-light">Perspective.</span></h2>
                  <p class="text-slate-400 text-lg leading-relaxed mb-12 max-w-md">Our AI engine analyzes thousands of exclusive data points to build a journey that resonates with your soul.</p>
                  <app-smart-trip-finder></app-smart-trip-finder>
               </div>
               <div class="hidden lg:block relative">
                  <div class="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] -rotate-6 blur-2xl"></div>
                  <img src="assets/hero.png" class="rounded-[3rem] shadow-3xl grayscale hover:grayscale-0 transition-all duration-1000 rotate-3 hover:rotate-0">
               </div>
            </div>
         </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .shadow-glow {
      box-shadow: 0 0 20px rgba(222, 255, 154, 0.2);
    }
    .font-serif {
      font-family: 'Playfair Display', serif;
    }
  `]
})
export class HomeComponent {
  private router = inject(Router);
  private tourService = inject(TourService);
  tours = this.tourService.allTours;
  isLoading = signal(true);
  isTop = signal(true);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 2000);
    
    // Listen to scroll to toggle search bar
    if (typeof window !== 'undefined') {
       window.addEventListener('scroll', () => {
         this.isTop.set(window.scrollY < 200);
       });
    }
  }

  navigate(id: string) {
    this.router.navigate(['/tour', id]);
  }
}
