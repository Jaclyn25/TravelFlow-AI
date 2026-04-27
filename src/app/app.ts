import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FloatingWhatsappBtnComponent } from './shared/components/floating-whatsapp/floating-whatsapp';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FloatingWhatsappBtnComponent],
  template: `
    <nav class="fixed top-0 left-0 w-full z-40 glass border-b border-white/20 py-4 px-6 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">TF</div>
          <span class="text-2xl font-black text-gray-900 tracking-tighter">Travel<span class="text-blue-600 font-extrabold">Flow</span></span>
        </div>
        
        <div class="hidden md:flex items-center gap-10">
          <a routerLink="/" class="text-sm font-bold text-gray-500 hover:text-blue-600 hover:scale-105 transition-all">Destinations</a>
          <a class="text-sm font-bold text-gray-500 hover:text-blue-600 hover:scale-105 transition-all cursor-pointer">About</a>
          <a class="text-sm font-bold text-gray-500 hover:text-blue-600 hover:scale-105 transition-all cursor-pointer">Favorites</a>
          <button class="bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-sm font-black hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200">Sign In</button>
        </div>
      </div>
    </nav>

    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>

    <app-floating-whatsapp></app-floating-whatsapp>
    
    <footer class="bg-white border-t border-gray-100 py-16 px-6 overflow-hidden relative">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div class="col-span-2">
           <div class="text-3xl font-black mb-6 tracking-tighter">TravelFlow <span class="text-blue-600">AI</span></div>
           <p class="text-gray-400 max-w-sm text-lg leading-relaxed">Redefining lead generation for the modern travel industry through AI and premium micro-interactions.</p>
        </div>
        <div>
          <h4 class="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Explore</h4>
          <ul class="text-gray-500 space-y-4 font-bold text-sm">
            <li class="hover:text-blue-600 cursor-pointer transition-colors">Popular Tours</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">Destinations</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">Reviews</li>
          </ul>
        </div>
        <div>
          <h4 class="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Help</h4>
          <ul class="text-gray-500 space-y-4 font-bold text-sm">
            <li class="hover:text-blue-600 cursor-pointer transition-colors">WhatsApp 24/7</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">FAQ</li>
            <li class="hover:text-blue-600 cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-gray-400">
        <span>&copy; 2026 TravelFlow AI. All rights reserved.</span>
        <div class="flex gap-8 uppercase tracking-widest">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  `
})
export class App {}
