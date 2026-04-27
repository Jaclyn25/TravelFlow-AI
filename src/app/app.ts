import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FloatingWhatsappBtnComponent } from './shared/components/floating-whatsapp/floating-whatsapp';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FloatingWhatsappBtnComponent],
  template: `
    <!-- Sticky Glass Navbar -->
    <nav class="fixed top-0 left-0 w-full z-50 glass border-b border-white/20 px-6 py-4 transition-all duration-300">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2 group cursor-pointer" routerLink="/">
          <div class="w-10 h-10 bg-gradient-to-br from-navy-900 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
            <span class="text-white font-black text-xl">T</span>
          </div>
          <span class="text-2xl font-black text-navy-900 tracking-tighter uppercase">Travel<span class="text-teal-600">Flow</span></span>
        </div>
        
        <div class="hidden md:flex items-center gap-8">
          <a routerLink="/" class="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors uppercase tracking-widest">Home</a>
          <a class="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors uppercase tracking-widest">Explore Tours</a>
          <a class="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors uppercase tracking-widest">Destinations</a>
          <a class="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors uppercase tracking-widest">About</a>
          <button class="bg-navy-900 text-white px-8 py-3 rounded-2xl text-xs font-black hover:bg-teal-600 transition-all active:scale-95 shadow-xl shadow-navy-900/20 uppercase tracking-widest">Sign In</button>
        </div>
      </div>
    </nav>

    <main class="min-h-screen pt-20">
      <router-outlet></router-outlet>
    </main>

    <app-floating-whatsapp></app-floating-whatsapp>
    
    <!-- Fat Footer -->
    <footer class="bg-navy-900 text-slate-300 pt-24 pb-12 px-6 relative overflow-hidden">
      <!-- Decorative Element -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div class="col-span-1 md:col-span-2">
           <div class="text-3xl font-black text-white mb-6 uppercase tracking-tighter">TravelFlow <span class="text-teal-600">AI</span></div>
           <p class="text-slate-400 max-w-sm text-lg leading-relaxed mb-8">
             Redefining how you discover the world. AI-powered itineraries, premium destinations, and seamless lead generation for the modern adventurer.
           </p>
           <div class="flex gap-4">
             <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"><i class="fab fa-facebook-f"></i></div>
             <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"><i class="fab fa-instagram"></i></div>
             <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"><i class="fab fa-twitter"></i></div>
           </div>
        </div>
        
        <div>
          <h4 class="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">Navigation</h4>
          <ul class="space-y-4 text-sm font-medium">
            <li class="hover:text-teal-600 cursor-pointer transition-colors">Popular Tours</li>
            <li class="hover:text-teal-600 cursor-pointer transition-colors">Special Offers</li>
            <li class="hover:text-teal-600 cursor-pointer transition-colors">Expert Guides</li>
            <li class="hover:text-teal-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">Newsletter</h4>
          <p class="text-sm mb-4">Subscribe to get secret deals and AI travel tips directly in your inbox.</p>
          <div class="flex flex-col gap-3">
            <input type="email" placeholder="Email Address" class="bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-600 outline-none w-full">
            <button class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-black tracking-widest text-slate-500">
        <span>&copy; 2026 TravelFlow AI. All rights reserved. Built with precision for the future of travel.</span>
        <div class="flex gap-8">
          <span class="hover:text-teal-600 cursor-pointer transition-colors">Terms of Service</span>
          <span class="hover:text-teal-600 cursor-pointer transition-colors">Cookie Policy</span>
        </div>
      </div>
    </footer>
  `
})
export class App {}
