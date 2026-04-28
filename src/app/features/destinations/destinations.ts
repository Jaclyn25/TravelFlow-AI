import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TravelDataService } from '../../core/services/travel-data.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20 transition-colors duration-500">
      <div class="max-w-7xl mx-auto px-6">
        <div class="mb-16">
          <h1 class="text-6xl font-black text-navy-900 dark:text-white mb-6 uppercase tracking-tighter font-serif">Select <span class="text-accent italic font-light">Horizon.</span></h1>
          <p class="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">A world of bespoke journeys awaits your command</p>
        </div>

        @if (isLoading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="bg-white/5 rounded-[3rem] h-[550px] animate-pulse border border-white/5"></div>
            }
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (dest of dataService.destinations(); track dest.id) {
              <div (click)="navigateToDestination(dest.id)" 
                   class="group relative h-[550px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-glow-accent transition-all duration-700 hover:-translate-y-4 border border-transparent hover:border-accent/10">
                <img [src]="dest.image" class="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent z-10"></div>
                
                <div class="absolute inset-0 p-12 flex flex-col justify-end z-20">
                  <div class="translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <div class="text-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {{ dest.tourCount }} Exclusive Itineraries
                    </div>
                    <h3 class="text-5xl font-black text-white uppercase tracking-tighter font-serif mb-4 leading-tight">{{ dest.name }}</h3>
                    <p class="text-slate-300 text-sm font-medium mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 italic">
                      {{ dest.description }}
                    </p>
                    
                    <button class="px-8 py-4 bg-accent/90 backdrop-blur rounded-2xl text-navy-900 text-[10px] font-black uppercase tracking-widest transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                      View Voyages
                    </button>
                  </div>
                </div>

                <div class="absolute top-10 right-10 z-20">
                   <div class="glass px-4 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-widest">
                      {{ dest.region }}
                   </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class DestinationsComponent implements OnInit {
  private router = inject(Router);
  dataService = inject(TravelDataService);

  isLoading = signal(true);

  ngOnInit() {
    setTimeout(() => this.isLoading.set(false), 800);
  }

  navigateToDestination(destinationId: string) {
    this.router.navigate(['/explore'], { queryParams: { destinationId } });
  }
}
