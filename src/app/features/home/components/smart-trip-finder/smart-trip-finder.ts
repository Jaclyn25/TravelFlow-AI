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
    <div class="glass relative z-10 w-full max-w-xl mx-auto overflow-hidden rounded-[2.5rem] border-white/40 shadow-2xl">
      <div class="p-8 md:p-12 relative z-10">
        <div class="text-center mb-10">
          <h3 class="text-3xl font-black text-navy-900 tracking-tighter">Find Your Perfect Escape</h3>
          <p class="text-slate-500 text-sm font-bold mt-2">AI-Powered Recommendations</p>
        </div>

        @if (currentStep() < 4) {
          <!-- Step Indicators -->
          <div class="flex justify-between mb-12 px-2 relative">
             <div class="absolute top-1/2 left-8 right-8 h-[2px] bg-slate-100 -translate-y-1/2 -z-10"></div>
             @for (step of [1, 2, 3]; track step) {
               <div [class]="'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-500 ' + (currentStep() >= step ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/30' : 'bg-white border border-slate-100 text-slate-300')">
                  {{ step }}
               </div>
             }
          </div>

          <!-- Step 1: Destination -->
          @if (currentStep() === 1) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Where to next?</label>
              <div class="grid grid-cols-2 gap-4">
                @for (d of destinations; track d) {
                  <button (click)="selectDestination(d)" 
                          [class]="'py-5 px-6 rounded-2xl text-sm font-extrabold border-2 transition-all ' + (selection().destination === d ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-teal-100')">
                    {{ d }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- Step 2: Budget -->
          @if (currentStep() === 2) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">What's the budget?</label>
              <div class="flex flex-col gap-4">
                @for (b of budgets; track b.value) {
                  <button (click)="selectBudget(b.value)"
                          [class]="'py-5 px-8 rounded-2xl text-left border-2 transition-all ' + (selection().budget === b.value ? 'border-teal-600 bg-teal-50' : 'border-slate-50 bg-slate-50/50 hover:border-teal-100')">
                    <div [class]="'font-extrabold text-sm ' + (selection().budget === b.value ? 'text-teal-600' : 'text-navy-900')">{{ b.label }}</div>
                    <div class="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{{ b.desc }}</div>
                  </button>
                }
              </div>
            </div>
          }

          <!-- Step 3: Style -->
          @if (currentStep() === 3) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">What's your vibe?</label>
              <div class="grid grid-cols-2 gap-4">
                @for (s of styles; track s.value) {
                  <button (click)="selectStyle(s.value)"
                          [class]="'py-8 px-4 rounded-3xl flex flex-col items-center gap-4 border-2 transition-all ' + (selection().style === s.value ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-slate-50 bg-slate-50/50 text-slate-500 hover:border-teal-100')">
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
              <button (click)="prevStep()" class="flex-1 py-5 text-xs font-black text-slate-400 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest">Back</button>
            }
            <button (click)="nextStep()" 
                    [disabled]="!canProceed()"
                    [class]="'flex-[2] py-5 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ' + (canProceed() ? 'bg-navy-900 text-white shadow-2xl shadow-navy-900/30 hover:bg-teal-600' : 'bg-slate-100 text-slate-300 cursor-not-allowed')">
              {{ currentStep() === 3 ? 'Get AI Match' : 'Continue' }}
            </button>
          </div>
        } @else {
          <!-- Match Result -->
          <div class="animate-fade-in-up text-center">
            @if (recommendedTour(); as tour) {
              <div class="relative rounded-[2rem] overflow-hidden mb-8 group bg-navy-900 shadow-2xl ring-4 ring-teal-600/10">
                <img [src]="tour.image" class="w-full h-56 object-cover opacity-70 group-hover:scale-110 transition-transform duration-[2000ms]">
                <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6 text-left">
                  <div class="inline-block bg-teal-600 text-white text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-3">99% Match For You</div>
                  <div class="text-white font-black text-3xl tracking-tighter leading-tight">{{ tour.title }}</div>
                </div>
              </div>
              <button [routerLink]="['/tour', tour.id]" class="w-full btn-primary py-5 rounded-2xl mb-6 text-sm">View Full Itinerary</button>
              <button (click)="resetForm()" class="w-full text-[11px] font-black text-slate-400 hover:text-teal-600 transition-colors uppercase tracking-[0.3em]">Adjust Preferences</button>
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
