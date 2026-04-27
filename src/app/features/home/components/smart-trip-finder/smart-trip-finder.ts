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
    <div class="glass p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border-white">
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-blue-400/20 blur-3xl rounded-full"></div>
      
      <div class="relative z-10">
        <div class="text-center mb-10">
          <h3 class="text-2xl font-black text-gray-900 tracking-tighter">Find Your Perfect Escape</h3>
          <p class="text-gray-500 text-sm font-bold mt-2">AI-Powered Recommendations</p>
        </div>

        @if (currentStep() < 4) {
          <div class="flex justify-between mb-10 px-4 relative">
             <div class="absolute top-1/2 left-4 right-4 h-[2px] bg-gray-100 -translate-y-1/2 -z-10"></div>
             @for (step of [1, 2, 3]; track step) {
               <div [class]="'w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ' + (currentStep() >= step ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-gray-100 text-gray-400')">
                  {{ step }}
               </div>
             }
          </div>

          @if (currentStep() === 1) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Destination</label>
              <div class="grid grid-cols-2 gap-3">
                @for (d of destinations; track d) {
                  <button (click)="selectDestination(d)" 
                          [class]="'py-4 px-6 rounded-2xl text-sm font-bold border transition-all ' + (selection().destination === d ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200')">
                    {{ d }}
                  </button>
                }
              </div>
            </div>
          }

          @if (currentStep() === 2) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Budget Level</label>
              <div class="flex flex-col gap-3">
                @for (b of budgets; track b.value) {
                  <button (click)="selectBudget(b.value)"
                          [class]="'py-4 px-6 rounded-2xl text-left border transition-all group ' + (selection().budget === b.value ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-gray-50 hover:border-blue-200')">
                    <div [class]="'font-bold ' + (selection().budget === b.value ? 'text-blue-600' : 'text-gray-900')">{{ b.label }}</div>
                    <div class="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{{ b.desc }}</div>
                  </button>
                }
              </div>
            </div>
          }

          @if (currentStep() === 3) {
            <div class="animate-fade-in-up">
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Travel Style</label>
              <div class="grid grid-cols-2 gap-3">
                @for (s of styles; track s.value) {
                  <button (click)="selectStyle(s.value)"
                          [class]="'py-6 px-4 rounded-3xl flex flex-col items-center gap-3 border transition-all ' + (selection().style === s.value ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200')">
                    <span class="text-2xl">{{ s.icon }}</span>
                    <span class="font-black text-[10px] uppercase tracking-widest">{{ s.label }}</span>
                  </button>
                }
              </div>
            </div>
          }

          <div class="flex gap-4 mt-10">
            @if (currentStep() > 1) {
              <button (click)="prevStep()" class="flex-1 py-4 text-xs font-black text-gray-400 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest">Back</button>
            }
            <button (click)="nextStep()" 
                    [disabled]="!canProceed()"
                    [class]="'flex-[2] py-4 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ' + (canProceed() ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed')">
              {{ currentStep() === 3 ? 'Get Match' : 'Continue' }}
            </button>
          </div>
        } @else {
          <div class="animate-fade-in-up">
            @if (recommendedTour(); as tour) {
              <div class="relative rounded-[2.5rem] overflow-hidden mb-6 group bg-gray-900">
                <img [src]="tour.image" class="w-full h-48 object-cover opacity-80 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6">
                  <div class="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-2">98% Match</div>
                  <div class="text-white font-black text-2xl tracking-tighter leading-none">{{ tour.title }}</div>
                </div>
              </div>
              <button [routerLink]="['/tour', tour.id]" class="w-full btn-primary py-5 rounded-2xl mb-4 text-sm font-black uppercase tracking-widest">View Adventure</button>
              <button (click)="resetForm()" class="w-full text-[10px] font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] text-center">Start New Search</button>
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
