import { Component, Input, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2">
      <div class="flex flex-col items-center">
        <div class="bg-gray-900/10 backdrop-blur-md text-gray-900 w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 shadow-sm">
          <span class="text-xl font-bold font-mono">{{ timeLeft().hours | number:'2.0' }}</span>
        </div>
        <span class="text-[10px] font-bold uppercase mt-1 opacity-50">Hrs</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="bg-gray-900/10 backdrop-blur-md text-gray-900 w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 shadow-sm">
          <span class="text-xl font-bold font-mono">{{ timeLeft().minutes | number:'2.0' }}</span>
        </div>
        <span class="text-[10px] font-bold uppercase mt-1 opacity-50">Min</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="bg-gray-900/10 backdrop-blur-md text-gray-900 w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 shadow-sm">
          <span class="text-xl font-bold font-mono">{{ timeLeft().seconds | number:'2.0' }}</span>
        </div>
        <span class="text-[10px] font-bold uppercase mt-1 opacity-50">Sec</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  timeLeft = signal({ hours: 0, minutes: 0, seconds: 0 });
  private intervalId: any;

  ngOnInit() {
    this.startTimer();
  }

  private startTimer() {
    const goal = new Date();
    goal.setHours(goal.getHours() + 2); // 2 hours from now
    goal.setMinutes(goal.getMinutes() + 45);

    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = goal.getTime() - now;

      if (distance < 0) {
        clearInterval(this.intervalId);
        this.timeLeft.set({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      this.timeLeft.set({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
