import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'animate-pulse bg-gray-200 rounded-xl ' + customClass"></div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SkeletonLoaderComponent {
  @Input() customClass = 'w-full h-4';
}
