import { Component, OnInit, signal, inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pb-20 transition-colors duration-500 overflow-hidden">
      <!-- Section 1: Vision & Identity -->
      <section class="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 reveal">
        <div class="max-w-4xl pt-20">
          <h1 class="text-7xl md:text-9xl font-black text-navy-900 dark:text-white uppercase tracking-tighter mb-12 font-serif leading-none italic">
            Redefining <span class="text-accent underline">Bespoke</span> Travel.
          </h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <p class="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              TravelFlow AI was born from a simple realization: the most meaningful journeys are those that resonate with the individual soul. We've moved beyond generic itineraries, combining the deep intuition of human travel architects with the precision of advanced cognitive AI.
            </p>
            <p class="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Our mission is to curate exclusive experiences that were previously unmapped. By leveraging data-driven insights and local human networks, we ensure every "Flow" is a masterpiece of discovery, luxury, and seamless execution.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 2: Core Values (Iconic Grid) -->
      <section class="py-32 px-6 bg-slate-100/50 dark:bg-white/5 reveal">
        <div class="max-w-7xl mx-auto">
          <div class="mb-20 text-center">
            <h2 class="text-4xl font-black text-navy-900 dark:text-white uppercase tracking-tighter font-serif">The <span class="text-accent italic">Architecture</span> of Trust</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Exclusivity -->
            <div class="glass dark:bg-navy-800/40 p-12 rounded-[3.5rem] border-white/20 group hover:-translate-y-4 transition-all duration-700 hover:shadow-glow-accent">
              <div class="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-navy-900 mb-8 transform group-hover:rotate-12 transition-transform shadow-lg">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7h.01M9 16h.01M15 16h.01M12 12h.01M12 8h.01"></path></svg>
              </div>
              <h3 class="text-2xl font-black text-navy-900 dark:text-white uppercase tracking-tighter font-serif mb-4">Exclusivity</h3>
              <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">Access to unlisted luxury destinations and private networks globally.</p>
            </div>

            <!-- Innovation -->
            <div class="glass dark:bg-navy-800/40 p-12 rounded-[3.5rem] border-white/20 group hover:-translate-y-4 transition-all duration-700 hover:shadow-glow-accent">
              <div class="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-navy-900 mb-8 transform group-hover:rotate-12 transition-transform shadow-lg">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 class="text-2xl font-black text-navy-900 dark:text-white uppercase tracking-tighter font-serif mb-4">Innovation</h3>
              <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">Powered by Angular 18 and Signal-driven Intelligence for predictive planning.</p>
            </div>

            <!-- Trust -->
            <div class="glass dark:bg-navy-800/40 p-12 rounded-[3.5rem] border-white/20 group hover:-translate-y-4 transition-all duration-700 hover:shadow-glow-accent">
              <div class="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-navy-900 mb-8 transform group-hover:rotate-12 transition-transform shadow-lg">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              </div>
              <h3 class="text-2xl font-black text-navy-900 dark:text-white uppercase tracking-tighter font-serif mb-4">Trust</h3>
              <p class="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">Seamless 24/7 human-and-AI support via integrated WhatsApp networks.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: The 'Why Us' (Stat Counters) -->
      <section class="py-32 px-6 reveal">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div class="space-y-4">
            <span class="text-8xl font-black text-navy-900 dark:text-white tracking-tighter font-serif italic">500<span class="text-accent">+</span></span>
            <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.4em]">Luxury Destinations</p>
          </div>
          <div class="space-y-4">
            <span class="text-8xl font-black text-navy-900 dark:text-white tracking-tighter font-serif italic">10k<span class="text-accent">k</span></span>
            <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.4em]">Happy Travelers</p>
          </div>
          <div class="space-y-4">
            <span class="text-8xl font-black text-navy-900 dark:text-white tracking-tighter font-serif italic">24<span class="text-accent">/</span>7</span>
            <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.4em]">Expert Support</p>
          </div>
        </div>
      </section>

      <!-- Section 4: Technical Excellence -->
      <section class="py-32 px-6 bg-navy-900 text-white reveal rounded-[5rem] mx-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-12">
            <h2 class="text-4xl font-black uppercase tracking-tighter font-serif mb-4">Technical <span class="text-accent italic">Excellence.</span></h2>
            <div class="w-20 h-1 bg-accent mx-auto mb-12"></div>
          </div>
          <div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <div class="flex flex-col items-center">
              <span class="text-2xl font-black tracking-tighter">Angular 18</span>
              <span class="text-[8px] uppercase tracking-widest text-accent">UI & Signals</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-2xl font-black tracking-tighter">.NET 8</span>
              <span class="text-[8px] uppercase tracking-widest text-accent">Orchestration</span>
            </div>
            <div class="flex flex-col items-center">
               <span class="text-2xl font-black tracking-tighter">Tailwind CSS</span>
               <span class="text-[8px] uppercase tracking-widest text-accent">Visual Layer</span>
            </div>
          </div>
          <p class="mt-16 text-slate-400 italic text-sm max-w-2xl mx-auto">TravelFlow AI is engineered for high performance, utilizing a modern decoupled architecture that ensures speed, security, and infinite scalability across global nodes.</p>
        </div>
      </section>

      <!-- Section 5: Team Section -->
      <section class="py-40 px-6 reveal">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-5xl font-black text-navy-900 dark:text-white uppercase tracking-tighter font-serif mb-24">The <span class="text-accent">Command</span> Team</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div class="flex flex-col items-center text-center group">
              <div class="w-64 h-64 bg-slate-200 dark:bg-navy-800 rounded-[4rem] overflow-hidden mb-10 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 shadow-2xl relative border-4 border-accent/20">
                 <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000" class="w-full h-full object-cover">
              </div>
              <h3 class="text-3xl font-black text-navy-900 dark:text-white tracking-tighter uppercase font-serif">Alex Sterling</h3>
              <p class="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Founder & Chief Architect</p>
              <p class="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed italic">With 15 years in luxury hospitality and a background in distributed systems, Alex bridges the gap between premium services and futuristic tech.</p>
            </div>
            
            <div class="flex flex-col items-center text-center group">
               <div class="w-64 h-64 bg-slate-200 dark:bg-navy-800 rounded-[4rem] overflow-hidden mb-10 transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-700 shadow-2xl relative border-4 border-accent/20">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000" class="w-full h-full object-cover">
               </div>
               <h3 class="text-3xl font-black text-navy-900 dark:text-white tracking-tighter uppercase font-serif">Sarah Chen</h3>
               <p class="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Head of Experience Design</p>
               <p class="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed italic">Sarah's vision for "Invisible Luxury" ensures that every digital and physical touchpoint of the TravelFlow journey is impeccable.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .reveal {
      opacity: 0;
      transform: translateY(50px);
      transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  `]
})
export class AboutComponent implements OnInit {
  platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initReveal();
    }
  }

  private initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pb-20 transition-colors duration-500 pt-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div class="reveal active">
            <h1 class="text-7xl md:text-8xl font-black text-navy-900 dark:text-white mb-12 tracking-tighter uppercase font-serif leading-none">
              Initiate <br><span class="text-accent italic font-light">Transmission.</span>
            </h1>
            <p class="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12 max-w-lg italic">
              Our specialists are ready to architect your next great escape. Reach out to secure your place in the future of travel.
            </p>
            
            <div class="space-y-8">
              <div class="flex items-center gap-6 group">
                <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:shadow-glow-accent transition-all duration-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Inquiries</span>
                  <span class="text-lg font-black text-navy-900 dark:text-white">vibe@travelflow.ai</span>
                </div>
              </div>

              <div class="flex items-center gap-6 group">
                <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:shadow-glow-accent transition-all duration-500">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Concierge Direct</span>
                  <span class="text-lg font-black text-navy-900 dark:text-white">+20 (Luxury) Flow</span>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-dark p-12 md:p-16 rounded-[4rem] border-white/10 shadow-3xl reveal active">
             <div class="space-y-8">
               <div class="grid grid-cols-2 gap-8">
                 <div class="space-y-3">
                   <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Identity</label>
                   <input type="text" placeholder="Alex Sterling" class="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:border-accent outline-none transition-all font-bold text-sm">
                 </div>
                 <div class="space-y-3">
                   <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Frequency (Email)</label>
                   <input type="email" placeholder="alex@voyage.com" class="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:border-accent outline-none transition-all font-bold text-sm">
                 </div>
               </div>
               
               <div class="space-y-3">
                 <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">The Inquiry</label>
                 <textarea placeholder="Describe the horizon you wish to reach..." rows="5" class="w-full bg-white/5 border border-white/10 rounded-[3rem] px-8 py-6 text-white focus:border-accent outline-none transition-all font-medium text-sm"></textarea>
               </div>

               <button class="w-full py-6 bg-accent hover:bg-accent-hover text-navy-900 rounded-3xl font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-glow text-xs">
                 Engage Specialists
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {}
