import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-navy-900 bg-grid-pattern p-6">
      <div class="glass-dark w-full max-w-md p-10 rounded-[2.5rem] border-white/5 animate-fade-in-up">
        <h2 class="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Welcome Back</h2>
        <p class="text-slate-400 mb-8 text-sm">Sign in to continue your journey</p>
        
        <div class="space-y-6">
          <div>
            <label class="block text-[10px] font-black text-accent uppercase tracking-widest mb-2">Email Address</label>
            <input type="email" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-accent outline-none transition-all">
          </div>
          <div>
            <label class="block text-[10px] font-black text-accent uppercase tracking-widest mb-2">Password</label>
            <input type="password" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-accent outline-none transition-all">
          </div>
          <button class="btn-primary w-full py-5">Enter Portal</button>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {}
