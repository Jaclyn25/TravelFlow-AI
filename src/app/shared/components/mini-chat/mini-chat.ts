import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-chat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-24 right-8 z-[60] flex flex-col items-end gap-4">
      <!-- Chat Window -->
      @if (isOpen()) {
        <div class="glass-dark w-80 rounded-[2rem] border-white/10 shadow-3xl overflow-hidden animate-fade-in-up">
           <div class="p-6 bg-accent/10 border-b border-white/5 flex items-center justify-between">
              <div class="flex items-center gap-3">
                 <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-navy-900 font-black text-xs shadow-lg">AI</div>
                 <span class="text-xs font-black text-white uppercase tracking-widest">Travel Concierge</span>
              </div>
              <button (click)="toggle()" class="text-slate-400 hover:text-white transition-colors">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
           </div>
           
           <div class="p-6 h-64 overflow-y-auto space-y-4">
              <div class="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 text-xs text-slate-300 leading-relaxed">
                 Hello! I'm your AI guide. Looking for a bespoke journey or have a quick question?
              </div>
              <div class="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 text-xs text-slate-300 leading-relaxed">
                 I can help you filter tours or prepare a direct WhatsApp link for our experts.
              </div>
           </div>
           
           <div class="p-4 border-t border-white/5">
              <button class="btn-primary w-full py-4 text-[10px]" (click)="redirectToWhatsApp()">Connect to Expert</button>
           </div>
        </div>
      }

      <!-- Floating Trigger -->
      <button (click)="toggle()" 
              [class]="'w-16 h-16 rounded-full flex items-center justify-center shadow-3xl transition-all duration-500 hover:scale-110 ' + (isOpen() ? 'bg-navy-800 text-white' : 'bg-accent text-navy-900')">
        @if (isOpen()) {
           <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        } @else {
           <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.222-4.032c1.504.893 2.909 1.33 4.595 1.331 5.287 0 9.589-4.301 9.591-9.589.001-2.564-.998-4.973-2.813-6.789s-4.225-2.815-6.79-2.815c-5.286 0-9.59 4.302-9.591 9.591 0 1.921.559 3.477 1.547 4.907l-.997 3.641 3.73-.978zm11.758-7.033c-.083-.139-.304-.222-.637-.388s-1.968-.971-2.273-1.082-.526-.166-.747.166-.857 1.082-1.051 1.303-.388.249-.72.083c-.332-.166-1.4-.516-2.667-1.645-1.033-.921-1.73-2.06-1.936-2.433-.207-.374-.022-.575.144-.741s.332-.388.498-.581.221-.277.332-.47c.11-.194.055-.36-.027-.526s-.748-1.802-1.025-2.466c-.269-.646-.541-.559-.747-.57l-.637-.012c-.221 0-.58.083-.884.415s-1.161 1.135-1.161 2.769 1.189 3.212 1.355 3.434c.166.221 2.34 3.573 5.669 5.008.791.341 1.41.545 1.894.699.794.252 1.517.217 2.088.131.637-.097 1.968-.803 2.244-1.579s.277-1.44.194-1.579z"/></svg>
        }
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class MiniChatComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  redirectToWhatsApp() {
    window.open('https://wa.me/yournumber', '_blank');
  }
}
