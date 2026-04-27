import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TourService, Tour } from '../../../../core/services/tour.service';

@Component({
  selector: 'app-smart-trip-finder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="glass relative z-10 w-full max-w-xl mx-auto overflow-hidden rounded-[2.5rem] border-white/40 shadow-2xl dark:bg-navy-900/40">
      <div class="p-8 md:p-12 relative z-10">
          <div class="text-center mb-10">
          <h3 class="text-3xl font-black text-navy-900 dark:text-white tracking-tighter uppercase mb-2">Find Your Escape</h3>
          <div class="w-12 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        @if (currentStep() < 4) {
          <!-- Step Indicators -->
          <div class="flex justify-between mb-12 px-2 relative">
             <div class="absolute top-1/2 left-8 right-8 h-[2px] bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-10"></div>
             @for (step of [1, 2, 3]; track step) {
               <div [class]="'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-500 ' + (currentStep() >= step ? 'bg-accent text-navy-900 shadow-xl' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-slate-300')">
                  {{ step }}
               </div>
             }
          </div>

          <!-- Step 1: Destination -->
          @if (currentStep() === 1) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Select Destination
              </label>
              <div class="grid grid-cols-2 gap-4">
                @for (d of destinations; track d) {
                  <button (click)="selectDestination(d)" 
                          [class]="'py-5 px-6 rounded-2xl text-sm font-extrabold border-2 transition-all ' + (selection().destination === d ? 'border-accent bg-accent/10 text-accent' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                    {{ d }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- Step 2: Budget -->
          @if (currentStep() === 2) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Investment Level
              </label>
              <div class="flex flex-col gap-4">
                @for (b of budgets; track b.value) {
                  <button (click)="selectBudget(b.value)"
                          [class]="'py-5 px-8 rounded-2xl text-left border-2 transition-all ' + (selection().budget === b.value ? 'border-accent bg-accent/10' : 'border-slate-50 bg-slate-50/50 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                    <div [class]="'font-extrabold text-sm ' + (selection().budget === b.value ? 'text-accent' : 'text-navy-900 dark:text-white')">{{ b.label }}</div>
                    <div class="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{{ b.desc }}</div>
                  </button>
                }
              </div>
            </div>
          }

          <!-- Step 3: Style -->
          @if (currentStep() === 3) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Experience Type
              </label>
              <div class="grid grid-cols-2 gap-4">
                @for (s of styles; track s.value) {
                  <button (click)="selectStyle(s.value)"
                          [class]="'py-8 px-4 rounded-3xl flex flex-col items-center gap-4 border-2 transition-all ' + (selection().style === s.value ? 'border-accent bg-accent/10 text-accent' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-accent/20 dark:border-white/5 dark:bg-white/5')">
                    <span class="text-3xl filter saturate-[0.8]">{{ s.icon }}</span>
                    <span class="font-black text-[10px] uppercase tracking-[0.2em]">{{ s.label }}</span>
                  </button>
                }
              </div>
            </div>
          }

          <!-- Navigation -->
          <div class="flex gap-4 mt-12">
            @if (currentStep() > 1) {
              <button (click)="prevStep()" class="flex-1 py-5 text-xs font-black text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest">Back</button>
            }
            <button (click)="nextStep()" 
                    [disabled]="!canProceed()"
                    [class]="'flex-[2] py-5 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ' + (canProceed() ? 'bg-accent text-navy-900 shadow-2xl hover:scale-[1.02]' : 'bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed')">
              {{ currentStep() === 3 ? 'Get AI Match' : 'Continue' }}
            </button>
          </div>
        } @else {
          <!-- Match Result -->
          <div class="animate-fade-in-up text-center">
            @if (recommendedTour(); as tour) {
              <!-- Success Animation -->
              <div class="flex flex-col items-center mb-8">
                 <svg class="w-16 h-16 mb-4" viewBox="0 0 52 52">
                   <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" style="stroke: #DEFF9A; stroke-width: 2;"/>
                   <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" 
                         style="stroke: #DEFF9A; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;"/>
                 </svg>
                 <div class="text-xs font-black text-accent uppercase tracking-[0.4em] animate-pulse">Match Found</div>
              </div>

              <div class="relative rounded-[2rem] overflow-hidden mb-8 group bg-navy-900 shadow-2xl ring-4 ring-accent/10">
                <img [src]="tour.image" class="w-full h-56 object-cover opacity-70 group-hover:scale-110 transition-transform duration-[2000ms]">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6 text-left">
                  <div class="inline-block bg-accent text-navy-900 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-3">99% Personal Match</div>
                  <div class="text-white font-black text-3xl tracking-tighter leading-tight">{{ tour.title }}</div>
                </div>
              </div>
              <button [routerLink]="['/tour', tour.id]" class="w-full btn-primary py-5 rounded-2xl mb-6 text-sm">View Full Itinerary</button>
              <button (click)="resetForm()" class="w-full text-[11px] font-black text-slate-400 hover:text-accent transition-colors uppercase tracking-[0.3em]">Adjust Preferences</button>
            }
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

  currentStep = signal(1);
  selection = signal({
    destination: '',
    budget: '',
    style: ''
  });

  destinations = ['Bali', 'Morocco', 'Greece', 'Japan'];
  budgets = [
    { value: 'budget', label: 'Value Focus', desc: 'Authentic & Affordable' },
    { value: 'mid', label: 'Balanced', desc: 'Comfort & Exploration' },
    { value: 'luxury', label: 'Ultra Luxury', desc: 'Private & Exclusive' }
  ];
  styles = [
    { value: 'adventure', label: 'Adventure', icon: '🧗' },
    { value: 'relaxation', label: 'Relax', icon: '🧘' },
    { value: 'culture', label: 'Culture', icon: '🏛️' },
    { value: 'romantic', label: 'Romantic', icon: '💖' }
  ];

  recommendedTour = signal<Tour | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.currentStep() === 4) {
        const s = this.selection();
        const tours = this.tourService.allTours();
        const match = tours.find(t => 
           t.destination.toLowerCase().includes(s.destination.toLowerCase()) ||
           (t.budgetRange === s.budget && t.style === s.style)
        ) || tours[0];
        this.recommendedTour.set(match);
      }
    });
  }

  canProceed() {
    if (this.currentStep() === 1) return !!this.selection().destination;
    if (this.currentStep() === 2) return !!this.selection().budget;
    if (this.currentStep() === 3) return !!this.selection().style;
    return false;
  }

  nextStep() {
    if (this.currentStep() < 4) this.currentStep.update(s => s + 1);
  }

  prevStep() {
    if (this.currentStep() > 1) this.currentStep.update(s => s - 1);
  }

  selectDestination(d: string) {
    this.selection.update(s => ({ ...s, destination: d }));
  }

  selectBudget(b: string) {
    this.selection.update(s => ({ ...s, budget: b }));
  }

  selectStyle(s: string | any) { // Type check workaround for s.value
    this.selection.update(prev => ({ ...prev, style: s }));
  }

  resetForm() {
    this.currentStep.set(1);
    this.selection.set({ destination: '', budget: '', style: '' });
  }
}
