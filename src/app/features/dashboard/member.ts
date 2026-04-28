import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TourService } from '../../core/services/tour.service';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-950 pt-32 pb-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <header class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in-up">
          <div>
            <span class="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Personal Space</span>
            <h1 class="text-5xl md:text-7xl font-black text-navy-900 dark:text-white font-serif tracking-tighter">
              Welcome back, <br><span class="text-accent italic font-light">{{ auth.user()?.name }}</span>
            </h1>
          </div>
          <div class="flex items-center gap-4">
             <div class="text-right hidden md:block">
               <div class="text-xs font-black text-navy-900 dark:text-white uppercase tracking-widest">{{ auth.user()?.email }}</div>
               <button (click)="auth.logout()" class="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline mt-1">Sign Out</button>
             </div>
             <img [src]="auth.user()?.avatar" class="w-16 h-16 rounded-[2rem] border-2 border-accent shadow-glow">
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Area (Wishlist) -->
          <div class="lg:col-span-2 space-y-12">
            <section>
              <div class="flex items-center justify-between mb-8">
                 <h2 class="text-2xl font-black text-navy-900 dark:text-white uppercase tracking-tight">Your Wishlist</h2>
                 <span class="bg-navy-900 dark:bg-white/5 text-slate-400 text-[10px] font-black px-4 py-1.5 rounded-full">{{ auth.wishlist().length }} Items</span>
              </div>

              @if (auth.wishlist().length === 0) {
                <div class="glass dark:bg-navy-900/60 p-20 rounded-[3rem] text-center border-dashed border-2 border-slate-200 dark:border-white/10">
                   <div class="text-4xl mb-6 opacity-30">✨</div>
                   <p class="text-slate-400 font-medium">Your dream journeys will appear here once saved.</p>
                   <button routerLink="/archive" class="text-accent text-[10px] font-black uppercase tracking-widest mt-8 hover:underline">Explore Collection</button>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  @for (id of auth.wishlist(); track id) {
                    @if (getTour(id); as tour) {
                      <div class="glass-dark border-white/5 rounded-[2.5rem] overflow-hidden group cursor-pointer" [routerLink]="['/tour', id]">
                        <div class="h-48 relative">
                           <img [src]="tour.image" class="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000">
                           <div class="absolute bottom-4 left-6">
                              <span class="text-white font-black text-lg tracking-tight">{{ tour.title }}</span>
                           </div>
                        </div>
                        <div class="p-6 flex items-center justify-between">
                           <span class="text-accent font-black text-xs">$ {{ tour.price }}</span>
                           <button (click)="$event.stopPropagation(); auth.toggleWishlist(id)" class="text-orange-500 text-[10px] font-black uppercase tracking-widest">Remove</button>
                        </div>
                      </div>
                    }
                  }
                </div>
              }
            </section>
          </div>

          <!-- Sidebar (History) -->
          <div class="lg:col-span-1">
             <section class="sticky top-32">
                <div class="flex items-center justify-between mb-8">
                   <h2 class="text-2xl font-black text-navy-900 dark:text-white uppercase tracking-tight">Inquiry History</h2>
                </div>
                
                <div class="space-y-4">
                  @for (item of auth.inquiries(); track item.id) {
                    <div class="p-6 glass dark:bg-navy-900/40 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-accent/30 transition-all group">
                       <div class="flex items-center justify-between mb-3">
                          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ item.date }}</span>
                          <span class="text-accent">
                             <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                          </span>
                       </div>
                       <div class="text-navy-900 dark:text-white font-black text-sm group-hover:text-accent transition-colors">{{ item.tourTitle }}</div>
                    </div>
                  } @empty {
                    <p class="text-slate-400 text-sm font-medium">No previous inquiries found.</p>
                  }
                </div>

                <!-- Profile Card -->
                <div class="mt-12 p-8 glass-dark border-accent/10 rounded-[2.5rem] bg-accent/5">
                   <h3 class="text-xs font-black text-accent uppercase tracking-[0.3em] mb-6">Concierge Active</h3>
                   <p class="text-slate-400 text-xs leading-relaxed mb-8">You are a **Premium Member**. Your personal travel agent is available for priority consultations.</p>
                   <button class="w-full btn-primary py-4 text-[10px]">Direct Agent Access</button>
                </div>
             </section>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .shadow-glow {
      box-shadow: 0 0 20px rgba(222, 255, 154, 0.2);
    }
  `]
})
export class MemberDashboardComponent {
  auth = inject(AuthService);
  private tourService = inject(TourService);

  getTour(id: string) {
    return this.tourService.getTourById(id)();
  }
}
