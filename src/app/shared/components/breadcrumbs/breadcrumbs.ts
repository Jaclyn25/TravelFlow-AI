import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (breadcrumbs().length > 0) {
      <nav class="flex px-6 mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-2 md:space-x-4">
          <li class="inline-flex items-center">
            <a routerLink="/" class="text-[10px] font-black text-slate-400 hover:text-accent uppercase tracking-widest transition-colors flex items-center">
              <svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Home
            </a>
          </li>
          @for (crumb of breadcrumbs(); track crumb.url; let last = $last) {
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-slate-600 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                @if (last) {
                  <span class="ml-1 md:ml-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">{{ crumb.label }}</span>
                } @else {
                  <a [routerLink]="crumb.url" class="ml-1 md:ml-2 text-[10px] font-black text-slate-400 hover:text-accent uppercase tracking-widest transition-colors">
                    {{ crumb.label }}
                  </a>
                }
              </div>
            </li>
          }
        </ol>
      </nav>
    }
  `
})
export class BreadcrumbsComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    ),
    { initialValue: [] as { label: string; url: string }[] }
  );

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: { label: string; url: string }[] = []): { label: string; url: string }[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['animation'] || routeURL;
      if (label && label !== 'Home') {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
