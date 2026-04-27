import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20 bg-grid-pattern">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-6xl font-black text-navy-900 dark:text-white mb-12 uppercase tracking-tighter">Explore <span class="text-accent underline">All</span> Packages</h1>
        <!-- Filters & List will go here -->
        <div class="flex items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-[3rem]">
          <p class="text-slate-500 font-bold uppercase tracking-widest text-sm">Packages Coming Soon</p>
        </div>
      </div>
    </div>
  `
})
export class ArchiveComponent {}
