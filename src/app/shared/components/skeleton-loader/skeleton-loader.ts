import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'animate-pulse bg-slate-200 dark:bg-slate-700 rounded-' + rounded() + ' ' + className()"
         [style.width]="width()"
         [style.height]="height()">
    </div>
  `,
  styles: [`
    :host { display: inline-block; width: 100%; }
    .animate-pulse {
      background: linear-gradient(
        90deg,
        rgba(226, 232, 240, 1) 0%,
        rgba(241, 245, 249, 1) 50%,
        rgba(226, 232, 240, 1) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite linear;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonLoaderComponent {
  width = input<string>('100%');
  height = input<string>('20px');
  rounded = input<string>('md');
  className = input<string>('');
}
