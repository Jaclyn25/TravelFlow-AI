import { Injectable, signal, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  readonly allToasts = this.toasts.asReadonly();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now();
    this.toasts.update(t => [...t, { id, message, type }]);
    setTimeout(() => this.remove(id), 5000);
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      @for (toast of toastService.allToasts(); track toast.id) {
        <div [class]="'pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-fade-in-right ' + getStyles(toast.type)">
          <span class="text-xl">{{ getIcon(toast.type) }}</span>
          <span class="text-xs font-black uppercase tracking-widest">{{ toast.message }}</span>
          <button (click)="toastService.remove(toast.id)" class="ml-4 opacity-50 hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-fade-in-right {
      animation: fadeInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(20px) scale(0.95); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
  `]
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

  getStyles(type: string) {
    switch (type) {
      case 'success': return 'bg-teal-50/90 border-teal-200 text-teal-700';
      case 'error': return 'bg-orange-50/90 border-orange-200 text-orange-600';
      default: return 'bg-navy-900/90 border-white/10 text-white';
    }
  }

  getIcon(type: string) {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  }
}
