import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-6xl font-black text-navy-900 dark:text-white mb-12 uppercase tracking-tighter">Iconic <span class="text-accent">Destinations</span></h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           @for (dest of ['Bali', 'Santorini', 'Kyoto']; track dest) {
             <div class="glass-dark h-80 rounded-[2.5rem] relative overflow-hidden group cursor-pointer">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent z-10"></div>
                <div class="absolute bottom-8 left-8 z-20">
                   <h3 class="text-2xl font-black text-white uppercase">{{ dest }}</h3>
                </div>
                <div class="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-30"></div>
             </div>
           }
        </div>
      </div>
    </div>
  `
})
export class DestinationsComponent {}
