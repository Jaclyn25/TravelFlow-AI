import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TravelDataService, Tour } from '../../core/services/travel-data.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="pb-20 transition-colors duration-500">
      <div class="mb-16">
        <h1 class="text-6xl font-black text-navy-900 dark:text-white mb-6 uppercase tracking-tighter font-serif">Curated <span class="text-accent italic font-light">Voyages.</span></h1>
        <p class="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Handpicked experiences for the discerning explorer</p>
      </div>

      <!-- Sophisticated Top Bar -->
      <div class="flex flex-col lg:flex-row gap-8 mb-16 items-start lg:items-center justify-between">
        <div class="flex flex-wrap gap-4">
          <button (click)="setCategory(null)" 
                  [class]="!dataService.selectedCategory() ? 'bg-accent text-navy-900 shadow-glow' : 'bg-white/5 text-slate-400 hover:bg-white/10'"
                  class="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
            All Collections
          </button>
          @for (cat of categories; track cat) {
            <button (click)="setCategory(cat)" 
                    [class]="dataService.selectedCategory() === cat ? 'bg-accent text-navy-900 shadow-glow' : 'bg-white/5 text-slate-400 hover:bg-white/10'"
                    class="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
              {{ cat }}
            </button>
          }
        </div>

        <div class="relative group w-full lg:w-96">
          <svg class="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input [(ngModel)]="searchQuery" placeholder="Search by vibe or region..." 
                 class="w-full pl-14 pr-6 py-5 bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-accent/30 transition-all font-bold text-xs dark:text-white placeholder:text-slate-500 uppercase tracking-widest">
        </div>
      </div>

      <!-- Results Grid -->
      @if (isLoading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (i of [1,2,3,4,5,6]; track i) {
            <div class="bg-white/5 rounded-[3rem] h-[450px] animate-pulse border border-white/5"></div>
          }
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (tour of filteredTours; track tour.id) {
            <div class="group relative bg-white dark:bg-navy-800/40 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4">
              <!-- Cinematic Image -->
              <div class="relative h-72 overflow-hidden">
                <img [src]="tour.image" class="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60"></div>
                <div class="absolute top-8 right-8 px-5 py-2 bg-accent text-navy-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-glow">
                  \${{ tour.price }}
                </div>
                <div class="absolute bottom-8 left-8">
                   <div class="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-[8px] font-black uppercase tracking-widest mb-3 border border-white/10">
                      {{ tour.duration }}
                   </div>
                   <h3 class="text-2xl font-black text-white uppercase tracking-tighter font-serif leading-tight">{{ tour.title }}</h3>
                </div>
              </div>

              <!-- Refined Content -->
              <div class="p-10">
                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-10 line-clamp-2 leading-relaxed italic">
                  {{ tour.description }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex gap-1 text-accent">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg class="w-2 h-2 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    }
                  </div>
                  <button [routerLink]="['/tour', tour.id]" class="text-accent text-[9px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform inline-flex items-center gap-3">
                    Experience
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>

        @if (filteredTours.length === 0) {
          <div class="text-center py-40 bg-white/5 rounded-[4rem] border-2 border-dashed border-white/5">
             <span class="text-5xl mb-8 block">🧭</span>
             <h3 class="text-3xl font-black text-navy-900 dark:text-white mb-4 font-serif uppercase tracking-tighter">Deserted Horizon</h3>
             <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">No voyages match your current criteria</p>
             <button (click)="resetFilters()" class="mt-8 text-accent underline text-[10px] font-black uppercase tracking-widest">Reset Discovery</button>
          </div>
        }
      }
    </div>
  `
})
export class ArchiveComponent implements OnInit {
  dataService = inject(TravelDataService);
  private route = inject(ActivatedRoute);

  searchQuery = signal('');
  categories = ['adventure', 'relaxation', 'culture', 'luxury'];
  isLoading = signal(true);

  get filteredTours() {
    const rawTours = this.dataService.filteredTours();
    const query = this.searchQuery().toLowerCase();
    
    if (!query) return rawTours;
    
    return rawTours.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const destId = params['destinationId'];
      this.dataService.selectedDestinationId.set(destId || null);
    });

    setTimeout(() => this.isLoading.set(false), 800);
  }

  setCategory(cat: string | null) {
    this.dataService.selectedCategory.set(cat);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.dataService.selectedCategory.set(null);
    this.dataService.selectedDestinationId.set(null);
  }
}
