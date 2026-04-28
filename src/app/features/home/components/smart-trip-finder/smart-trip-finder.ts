import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TourService, Tour } from '../../../../core/services/tour.service';
import { WhatsAppService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-smart-trip-finder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="glass dark:bg-navy-900/60 relative z-10 w-full overflow-hidden rounded-[3rem] border-white/20 shadow-2xl transition-all duration-700">
      <div class="p-10 md:p-16 relative z-10">
        @if (currentStep() < 5) {
          <!-- Progress Bar -->
          <div class="mb-20">
             <div class="flex justify-between items-center mb-4">
                <span class="text-accent text-[10px] font-black uppercase tracking-widest">Phase {{ currentStep() }} of 4</span>
                <span class="text-slate-400 text-[10px] font-black uppercase tracking-widest">{{ stepTitles[currentStep()-1] }}</span>
             </div>
             <div class="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-accent transition-all duration-1000 shadow-glow" [style.width.%]="(currentStep() / 4) * 100"></div>
             </div>
          </div>

          <!-- Step Content -->
          <div class="min-h-[300px]">
             @if (currentStep() === 1) {
               <div class="animate-fade-in-up">
                 <h3 class="text-3xl font-black text-navy-900 dark:text-white font-serif mb-12 tracking-tighter">Where should we <br><span class="text-accent italic font-light">begin?</span></h3>
                 <div class="grid grid-cols-2 gap-4">
                   @for (d of destinations; track d) {
                     <button (click)="selectDestination(d)" 
                             [class]="'py-6 px-6 rounded-3xl text-xs font-black uppercase tracking-wider border-2 transition-all ' + (selection().destination === d ? 'border-accent bg-accent/5 text-accent' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                       {{ d }}
                     </button>
                   }
                 </div>
               </div>
             }

             @if (currentStep() === 2) {
               <div class="animate-fade-in-up">
                 <h3 class="text-3xl font-black text-navy-900 dark:text-white font-serif mb-12 tracking-tighter">How long is the <br><span class="text-accent italic font-light">escape?</span></h3>
                 <div class="grid grid-cols-2 gap-4">
                   @for (dur of durations; track dur) {
                     <button (click)="selectDuration(dur)" 
                             [class]="'py-6 px-6 rounded-3xl text-xs font-black uppercase tracking-wider border-2 transition-all ' + (selection().duration === dur ? 'border-accent bg-accent/5 text-accent' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                       {{ dur }} Days
                     </button>
                   }
                 </div>
               </div>
             }

             @if (currentStep() === 3) {
               <div class="animate-fade-in-up">
                 <h3 class="text-3xl font-black text-navy-900 dark:text-white font-serif mb-12 tracking-tighter">Define the <br><span class="text-accent italic font-light">investment.</span></h3>
                 <div class="space-y-4">
                   @for (b of budgets; track b.value) {
                     <button (click)="selectBudget(b.value)"
                             [class]="'w-full py-6 px-8 rounded-3xl text-left border-2 transition-all ' + (selection().budget === b.value ? 'border-accent bg-accent/5' : 'border-slate-50 bg-slate-50/50 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                       <span [class]="'font-black text-xs uppercase tracking-widest ' + (selection().budget === b.value ? 'text-accent' : 'text-navy-900 dark:text-white')">{{ b.label }}</span>
                       <p class="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest opacity-60">{{ b.desc }}</p>
                     </button>
                   }
                 </div>
               </div>
             }

             @if (currentStep() === 4) {
               <div class="animate-fade-in-up">
                 <h3 class="text-3xl font-black text-navy-900 dark:text-white font-serif mb-12 tracking-tighter">What is the <br><span class="text-accent italic font-light">vibe?</span></h3>
                 <div class="grid grid-cols-2 gap-4">
                   @for (s of vibes; track s.value) {
                     <button (click)="selectVibe(s.value)"
                             [class]="'py-10 px-4 rounded-[2.5rem] flex flex-col items-center gap-6 border-2 transition-all ' + (selection().vibe === s.value ? 'border-accent bg-accent/5 text-accent animate-glow' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                       <span class="text-4xl grayscale hover:grayscale-0 transition-all">{{ s.icon }}</span>
                       <span class="font-black text-[9px] uppercase tracking-[0.3em]">{{ s.label }}</span>
                     </button>
                   }
                 </div>
               </div>
             }
          </div>

          <!-- Navigation -->
          <div class="flex items-center gap-6 mt-16 pt-8 border-t border-slate-100 dark:border-white/5">
             @if (currentStep() > 1) {
               <button (click)="prevStep()" class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-navy-900 dark:hover:text-white transition-colors">Back</button>
             }
             <button (click)="nextStep()" 
                     [disabled]="!canProceed()"
                     [class]="'ml-auto px-12 py-5 rounded-2xl text-[10px] font-black transition-all uppercase tracking-[0.2em] ' + (canProceed() ? 'bg-accent text-navy-900 shadow-2xl hover:scale-105' : 'bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600')">
               {{ currentStep() === 4 ? 'Build My Perspective' : 'Next Discovery' }}
             </button>
          </div>
        } @else {
          <!-- Itinerary Summary -->
          <div class="animate-fade-in-up">
             <div class="text-center mb-16">
                <div class="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-navy-900 mx-auto mb-8 shadow-glow rotate-12">
                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="text-4xl font-black text-navy-900 dark:text-white font-serif tracking-tighter mb-4">Itinerary <br><span class="text-accent italic font-light">Synthesized.</span></h3>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Built specially for your unique profile</p>
             </div>

             <div class="space-y-6 mb-16">
                <div class="flex items-center justify-between p-6 glass rounded-2xl border-white/10">
                   <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</span>
                   <span class="text-navy-900 dark:text-white font-black text-sm uppercase tracking-widest italic">{{ selection().destination }}</span>
                </div>
                <div class="flex items-center justify-between p-6 glass rounded-2xl border-white/10">
                   <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                   <span class="text-navy-900 dark:text-white font-black text-sm uppercase tracking-widest italic">{{ selection().duration }} Days</span>
                </div>
                <div class="flex items-center justify-between p-6 glass rounded-2xl border-white/10">
                   <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investment</span>
                   <span class="text-accent font-black text-sm uppercase tracking-widest">{{ selection().budget }}</span>
                </div>
             </div>

             <div class="flex flex-col gap-4">
                <a [href]="getWhatsAppLink()" target="_blank" class="btn-whatsapp py-6 rounded-2xl flex items-center justify-center gap-4 group">
                  <span class="uppercase tracking-[0.3em] text-[10px] font-black">Reserve Journey on WhatsApp</span>
                  <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
                <button (click)="resetForm()" class="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-accent transition-colors">Start Over</button>
             </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SmartTripFinderComponent {
  private tourService = inject(TourService);
  private whatsapp = inject(WhatsAppService);

  currentStep = signal(1);
  selection = signal<any>({
    destination: '',
    duration: '',
    budget: '',
    vibe: ''
  });

  stepTitles = ['Destination Selection', 'Time Horizon', 'Investment Level', 'Soul Alignment'];
  destinations = ['Bali', 'Morocco', 'Greece', 'Japan', 'Iceland', 'Italy'];
  durations = ['3-5', '7-10', '14+', '21+'];
  budgets = [
    { value: 'Bespoke', label: 'Bespoke Premium', desc: 'Curated luxury for the discerning' },
    { value: 'Elite', label: 'Elite Explorer', desc: 'Private jets & unlisted locations' },
    { value: 'Foundational', label: 'Foundational', desc: 'The core luxury experience' }
  ];
  vibes = [
    { value: 'Adventure', label: 'Pulse', icon: '⚡' },
    { value: 'Relaxation', label: 'Stillness', icon: '🌑' },
    { value: 'Culture', label: 'Wisdom', icon: '📜' },
    { value: 'Romantic', label: 'Intimacy', icon: '✨' }
  ];

  recommendedTour = signal<Tour | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.currentStep() === 5) {
        const s = this.selection();
        const tours = this.tourService.allTours();
        // Matching logic simplified for SaaS demo
        const match = tours.find(t => t.destination.toLowerCase().includes(s.destination.toLowerCase())) || tours[0];
        this.recommendedTour.set(match);
      }
    });
  }

  canProceed() {
    const s = this.selection() as any;
    const steps: (keyof typeof s)[] = ['destination', 'duration', 'budget', 'vibe'];
    return !!s[steps[this.currentStep() - 1]];
  }

  nextStep() {
    if (this.currentStep() < 5) this.currentStep.update(s => s + 1);
  }

  prevStep() {
    if (this.currentStep() > 1) this.currentStep.update(s => s - 1);
  }

  selectDestination(d: string) {
    this.selection.update(s => ({ ...s, destination: d }));
  }

  selectDuration(d: string) {
    this.selection.update(s => ({ ...s, duration: d }));
  }

  selectBudget(b: string) {
    this.selection.update(s => ({ ...s, budget: b }));
  }

  selectVibe(v: string) {
    this.selection.update(prev => ({ ...prev, vibe: v }));
  }

  getWhatsAppLink() {
    return this.whatsapp.buildItineraryLink(this.selection());
  }

  resetForm() {
    this.currentStep.set(1);
    this.selection.set({ destination: '', duration: '', budget: '', vibe: '' });
  }
}
