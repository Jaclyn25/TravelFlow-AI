import { Component, Input, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-urgency-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm animate-fade-in-up">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
      </span>
      <span>{{ viewers() }} travelers are viewing this tour</span>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class UrgencyBadgeComponent implements OnInit, OnDestroy {
  @Input() initialViewers = 8;
  viewers = signal(8);
  private intervalId: any;

  ngOnInit() {
    this.viewers.set(this.initialViewers);
    this.simulateActivity();
  }

  private simulateActivity() {
    this.intervalId = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      this.viewers.update(v => Math.max(3, v + delta));
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
