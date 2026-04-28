import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, ChildrenOutletContexts } from '@angular/router';
import { trigger, transition, style, query, animate } from '@angular/animations';
import { FloatingWhatsappBtnComponent } from './shared/components/floating-whatsapp/floating-whatsapp';
import { ToastContainerComponent } from './shared/components/toast/toast';
import { BreadcrumbsComponent } from './shared/components/breadcrumbs/breadcrumbs';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FloatingWhatsappBtnComponent, ToastContainerComponent, BreadcrumbsComponent],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            opacity: 0
          })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' })
        ], { optional: true }),
        query(':leave', [
          animate('0.3s ease-out', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <!-- Sticky Glass Navbar -->
    <nav class="fixed top-0 left-0 w-full z-50 glass border-b border-white/20 px-6 py-4 transition-all duration-300">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2 group cursor-pointer" routerLink="/">
          <div class="w-10 h-10 bg-gradient-to-br from-navy-900 to-accent rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
            <span class="text-navy-900 font-black text-xl">T</span>
          </div>
          <span class="text-2xl font-black text-navy-900 tracking-tighter uppercase dark:text-white">Travel<span class="text-accent">Flow</span></span>
        </div>
        
        <div class="hidden lg:flex items-center gap-8">
          <a routerLink="/" class="text-[10px] font-black text-slate-600 hover:text-accent transition-colors uppercase tracking-widest dark:text-slate-400">Home</a>
          <a routerLink="/archive" class="text-[10px] font-black text-slate-600 hover:text-accent transition-colors uppercase tracking-widest dark:text-slate-400">Explore</a>
          <a routerLink="/destinations" class="text-[10px] font-black text-slate-600 hover:text-accent transition-colors uppercase tracking-widest dark:text-slate-400">Destinations</a>
          <a routerLink="/about" class="text-[10px] font-black text-slate-600 hover:text-accent transition-colors uppercase tracking-widest dark:text-slate-400">About</a>
          
          <!-- Dark Mode Toggle -->
          <button (click)="theme.toggleTheme()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-accent hover:scale-110 transition-transform">
            @if (theme.isDarkMode()) {
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            } @else {
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            }
          </button>

          <button routerLink="/auth/login" class="btn-primary">Sign In</button>
        </div>
      </div>
    </nav>

    <main class="min-h-screen dark:bg-navy-900 transition-colors duration-500 pb-20" [@routeAnimations]="getRouteAnimationData()">
      <div class="pt-32 max-w-7xl mx-auto px-6">
        <app-breadcrumbs></app-breadcrumbs>
        <router-outlet></router-outlet>
      </div>
    </main>

    <app-floating-whatsapp></app-floating-whatsapp>
    <app-toast-container></app-toast-container>
    
    <!-- Fat Footer -->
    <footer class="bg-navy-900 text-slate-300 pt-24 pb-12 px-6 relative overflow-hidden border-t border-white/5">
      <!-- Decorative Element -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div class="col-span-1 md:col-span-2">
           <div class="text-3xl font-black text-white mb-6 uppercase tracking-tighter">TravelFlow <span class="text-accent underline decoration-4 underline-offset-8">AI</span></div>
           <p class="text-slate-400 max-w-sm text-lg leading-relaxed mb-8 italic">
             "Redefining how you discover the world. AI-powered itineraries and premium experiences for the modern explorer."
           </p>
           <div class="flex gap-4">
             <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent hover:text-navy-900 transition-colors cursor-pointer"><i class="fab fa-facebook-f"></i></div>
             <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent hover:text-navy-900 transition-colors cursor-pointer"><i class="fab fa-instagram"></i></div>
             <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent hover:text-navy-900 transition-colors cursor-pointer"><i class="fab fa-twitter"></i></div>
           </div>
        </div>
        
        <div>
          <h4 class="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">Journey</h4>
          <ul class="space-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <li class="hover:text-accent cursor-pointer transition-colors" routerLink="/archive">Popular Tours</li>
            <li class="hover:text-accent cursor-pointer transition-colors" routerLink="/destinations">Destinations</li>
            <li class="hover:text-accent cursor-pointer transition-colors" routerLink="/about">Our Story</li>
            <li class="hover:text-accent cursor-pointer transition-colors" routerLink="/contact">Contact Support</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">Newsletter</h4>
          <p class="text-sm text-slate-400 mb-6">Subscribe to our AI travel journal.</p>
          <div class="flex flex-col gap-3">
            <input type="email" placeholder="Email Address" class="bg-slate-800/50 border border-white/5 rounded-xl px-4 py-4 text-xs focus:ring-1 focus:ring-accent outline-none w-full text-white">
            <button class="btn-primary w-full py-4 text-[10px]">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase font-black tracking-[0.3em] text-slate-600">
        <span>&copy; 2026 TravelFlow AI. Built with precision.</span>
        <div class="flex gap-8">
          <span class="hover:text-accent cursor-pointer transition-colors">Terms of Service</span>
          <span class="hover:text-accent cursor-pointer transition-colors">Cookie Policy</span>
        </div>
      </div>
    </footer>
  `
})
export class App {
  theme = inject(ThemeService);
  private contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return (this.contexts.getContext('primary') as any)?.route?.snapshot?.data?.['animation'];
  }
}
