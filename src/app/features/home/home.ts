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
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 transition-colors duration-500 bg-grid-pattern">
      <!-- Immersive Hero Section -->
      <section class="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <!-- Hero Image with Overlay -->
        <div class="absolute inset-0 z-0">
          <img src="assets/hero.png" class="w-full h-full object-cover scale-110 animate-subtle-zoom" alt="Hero Travel">
          <div class="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-slate-50 dark:to-navy-900"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="fade-in-up">
              <span class="inline-block bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg shadow-orange-500/20">
                Premium Travel Experience
              </span>
              <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                Your Next <br><span class="text-accent underline decoration-8 underline-offset-[12px]">Great Adventure</span> Starts Here.
              </h1>
              <p class="text-xl text-slate-200 font-medium max-w-lg leading-relaxed mb-10 text-balance italic border-l-4 border-accent pl-6">
                "Escape the ordinary with AI-tailored journeys to the most exclusive corners of our planet."
              </p>
            <div class="flex items-center gap-6 mb-12">
              <button routerLink="/destinations" class="btn-primary px-10 py-5">View Destinations</button>
              <div class="hidden md:flex flex-col">
                <div class="flex -space-x-3 mb-2">
                  <img src="https://i.pravatar.cc/150?u=1" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                  <img src="https://i.pravatar.cc/150?u=2" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                  <img src="https://i.pravatar.cc/150?u=3" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                </div>
                <span class="text-[10px] font-black text-white uppercase tracking-widest">50k+ Happy Travelers</span>
              </div>
            </div>

            <!-- Destination Suggestions (Chips) -->
            <div class="flex flex-wrap gap-3">
               @for (city of ['Bali', 'Santorini', 'Kyoto', 'Marrakech']; track city) {
                 <span class="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-accent hover:text-navy-900 transition-all cursor-pointer">{{ city }}</span>
               }
            </div>
            </div>

            <!-- Smart Finder Form -->
            <div class="fade-in-up" style="animation-delay: 0.2s">
               <app-smart-trip-finder></app-smart-trip-finder>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Grid Section -->
      <section class="max-w-7xl mx-auto px-6 py-32">
        <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-2">
          <div>
            <h2 class="text-5xl font-black text-navy-900 dark:text-white tracking-tighter uppercase">Explore <span class="text-accent underline">Bespoke</span> Tours</h2>
            <p class="text-slate-400 font-bold mt-3 text-lg tracking-tight">Our AI-Curated Masterpieces for 2026</p>
          </div>
          <button routerLink="/archive" class="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-white/5 px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all shadow-sm dark:text-slate-400">
             Browse All Tours
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @if (isLoading()) {
            @for (i of [1,2,3,4]; track i) {
               <div class="flex flex-col gap-4">
                 <app-skeleton-loader height="320px" rounded="3xl"></app-skeleton-loader>
                 <app-skeleton-loader height="24px" width="60%"></app-skeleton-loader>
                 <app-skeleton-loader height="16px" width="80%"></app-skeleton-loader>
               </div>
            }
          } @else {
            @for (tour of tours(); track tour.id; let i = $index) {
              <div class="card-bento group cursor-pointer h-[450px] relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 shadow-navy-900/10 dark:shadow-black" (click)="navigate(tour.id)">
                <img [src]="tour.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent"></div>
                
                <div class="absolute top-8 right-8">
                   <div class="bg-accent/90 backdrop-blur-md text-navy-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl transition-all group-hover:bg-accent group-hover:scale-110">{{ tour.viewingCount }} viewing</div>
                </div>

                <div class="absolute bottom-10 left-10 right-10">
                   <div class="flex items-center gap-2 mb-4">
                     <span class="bg-accent text-navy-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{{ tour.style }}</span>
                     <span class="text-accent font-black text-[10px] uppercase tracking-widest">$ {{ tour.price }}</span>
                   </div>
                   <h3 class="text-3xl font-black text-white tracking-tighter leading-tight mb-8">{{ tour.title }}</h3>
                   <button class="bg-white text-navy-900 font-extrabold text-[10px] px-8 py-4 rounded-2xl hover:bg-accent transition-all uppercase tracking-widest shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">Explore Experience</button>
                </div>
              </div>
            }
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes subtle-zoom {
      from { transform: scale(1.1); }
      to { transform: scale(1.05); }
    }
    .animate-subtle-zoom {
      animation: subtle-zoom 20s infinite alternate ease-in-out;
    }
  `]
})
export class HomeComponent {
  private router = inject(Router);
  private tourService = inject(TourService);
  tours = this.tourService.allTours;
  isLoading = signal(true);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  navigate(id: string) {
    this.router.navigate(['/tour', id]);
  }
}
