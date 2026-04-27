import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h1 class="text-5xl font-black text-navy-900 dark:text-white mb-8">Our Vision</h1>
        <p class="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
          We combine cutting-edge AI with deep travel expertise to curate journeys that are as unique as you are.
        </p>
      </div>
    </div>
  `
})
export class AboutComponent {}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 class="text-6xl font-black text-navy-900 dark:text-white mb-8 tracking-tighter uppercase">Connect With <br><span class="text-accent underline decoration-4">The Future</span></h1>
            <p class="text-slate-500 mb-12">Drop us a line and our AI coordinator will reach out shortly.</p>
          </div>
          <div class="glass-dark p-12 rounded-[3.5rem] border-white/5 space-y-6">
             <input type="text" placeholder="Your Name" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none">
             <input type="email" placeholder="Email Address" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none">
             <textarea placeholder="Your Message" rows="4" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent outline-none"></textarea>
             <button class="btn-primary w-full py-5">Send Transmission</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {}
