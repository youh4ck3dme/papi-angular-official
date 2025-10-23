import { Injectable, inject, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeoService implements OnDestroy {
  // Fix: Explicitly type injected services to resolve type inference issues.
  private titleService: Title = inject(Title);
  private metaService: Meta = inject(Meta);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route: ActivatedRoute = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap(route => route.data),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      const title = data['title'] || 'PAPI Hair Design';
      this.updateTitle(title);
    });
  }

  updateTitle(title: string) {
    this.titleService.setTitle(`${title} | PAPI Hair Design`);
  }

  updateMetaTags(config: { description: string, image?: string }) {
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ property: 'og:title', content: this.titleService.getTitle() });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
