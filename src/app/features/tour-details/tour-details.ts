import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TravelDataService, Tour } from '../../core/services/travel-data.service';
import { WhatsAppService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (tour()) {
      <div class="pb-20 transition-colors duration-500">
        <!-- Hero Header -->
        <div class="relative h-[70vh] rounded-[4rem] overflow-hidden mb-16 shadow-2xl">
          <img [src]="tour()?.image" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent"></div>
          
          <div class="absolute inset-0 p-12 md:p-24 flex flex-col justify-end">
            <div class="max-w-4xl animate-fade-in-up">
              <div class="flex items-center gap-4 mb-6">
                <span class="px-4 py-2 bg-accent text-navy-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-glow">
                  {{ tour()?.category }} Collection
                </span>
                <span class="text-white/60 text-[10px] font-black uppercase tracking-widest">{{ tour()?.duration }} Voyage</span>
              </div>
              <h1 class="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter font-serif leading-tight mb-6">
                {{ tour()?.title }}
              </h1>
              <p class="text-2xl text-slate-300 font-medium italic max-w-2xl leading-relaxed">
                "{{ tour()?.subtitle }}"
              </p>
            </div>
          </div>
          
          <div class="absolute top-12 right-12">
            <div class="glass p-8 rounded-[2.5rem] text-center border-white/20">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Investment</div>
              <div class="text-4xl font-black text-accent shadow-glow">
                \${{ tour()?.price }}
              </div>
              <div class="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-2">Per Explorer</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-16">
            <section>
              <h2 class="text-4xl font-black text-navy-900 dark:text-white uppercase tracking-tighter mb-8 font-serif">The <span class="text-accent underline">Vision</span></h2>
              <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {{ tour()?.description }}
              </p>
            </section>

            <section>
              <h2 class="text-4xl font-black text-navy-900 dark:text-white uppercase tracking-tighter mb-12 font-serif">Curated <span class="text-accent underline">Itinerary</span></h2>
              <div class="space-y-8">
                @for (item of tour()?.itinerary; track item.day) {
                  <div class="group relative pl-12 pb-12 border-l-2 border-slate-100 dark:border-white/5 last:pb-0">
                    <div class="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-navy-900 dark:bg-white border-4 border-accent shadow-glow transition-transform group-hover:scale-125"></div>
                    <div class="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-2">Day {{ item.day }} Encounter</div>
                    <h3 class="text-2xl font-black text-navy-900 dark:text-white uppercase font-serif mb-4">{{ item.title }}</h3>
                    <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                      {{ item.content }}
                    </p>
                  </div>
                }
              </div>
            </section>
          </div>

          <!-- Checkout/Action Sidebar -->
          <div class="space-y-8">
            <div class="glass dark:bg-navy-800/40 p-10 rounded-[3rem] border-white/20 sticky top-32">
              <h3 class="text-2xl font-black text-navy-900 dark:text-white uppercase tracking-tighter mb-6 font-serif">Secure This Journey</h3>
              <p class="text-slate-500 dark:text-slate-400 text-xs font-medium mb-8 uppercase tracking-widest">Limited capacity for bespoke expeditions</p>
              
              <button (click)="bookNow()" class="w-full py-6 bg-accent hover:bg-accent-hover text-navy-900 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-glow mb-6">
                Consult with Specialist
              </button>
              
              <p class="text-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                Protected by Luxury Satisfaction Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class TourDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(TravelDataService);
  private whatsapp = inject(WhatsAppService);

  tour = signal<Tour | null>(null);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['tourId'];
      const found = this.dataService.getTourById(id)();
      if (found) {
        this.tour.set(found);
      }
    });
  }

  bookNow() {
    const t = this.tour();
    if (t) {
      this.whatsapp.sendGeneralInquiry(`I am interested in the ${t.title} voyage in ${t.duration}. Please advise on availability.`);
    }
  }
}
