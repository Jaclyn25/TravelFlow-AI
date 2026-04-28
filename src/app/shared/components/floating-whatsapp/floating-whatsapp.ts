import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsAppService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a [href]="whatsappLink()" 
       target="_blank"
       class="fixed bottom-10 right-10 z-50 flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full shadow-2xl hover:bg-teal-700 transition-all duration-300 hover:scale-110 group animate-pulse-whatsapp">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.222-4.032c1.504.893 2.909 1.33 4.595 1.331 5.287 0 9.589-4.301 9.591-9.589.001-2.564-.998-4.973-2.813-6.789s-4.225-2.815-6.79-2.815c-5.286 0-9.59 4.302-9.591 9.591 0 1.921.559 3.477 1.547 4.907l-.997 3.641 3.73-.978zm11.758-7.033c-.083-.139-.304-.222-.637-.388s-1.968-.971-2.273-1.082-.526-.166-.747.166-.857 1.082-1.051 1.303-.388.249-.72.083c-.332-.166-1.4-.516-2.667-1.645-1.033-.921-1.73-2.06-1.936-2.433-.207-.374-.022-.575.144-.741s.332-.388.498-.581.221-.277.332-.47c.11-.194.055-.36-.027-.526s-.748-1.802-1.025-2.466c-.269-.646-.541-.559-.747-.57l-.637-.012c-.221 0-.58.083-.884.415s-1.161 1.135-1.161 2.769 1.189 3.212 1.355 3.434c.166.221 2.34 3.573 5.669 5.008.791.341 1.41.545 1.894.699.794.252 1.517.217 2.088.131.637-.097 1.968-.803 2.244-1.579s.277-1.44.194-1.579z"/>
      </svg>
      <span class="absolute right-full mr-6 px-4 py-2 bg-navy-900 text-white text-[10px] font-black rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none uppercase tracking-widest translate-x-4 group-hover:translate-x-0">
        Chat with a Travel Agent
      </span>
    </a>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class FloatingWhatsappBtnComponent {
  private whatsappService = inject(WhatsAppService);

  whatsappLink() {
    return this.whatsappService.generateLink('Travel Planning Inquiry');
  }
}
