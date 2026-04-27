import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="glass-dark p-12 rounded-[3.5rem] border-white/5">
           <h1 class="text-4xl font-black text-white mb-4">Hello, Explorers!</h1>
           <p class="text-slate-400">Manage your saved trips and inquiry history here.</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  auth = inject(AuthService);
}
