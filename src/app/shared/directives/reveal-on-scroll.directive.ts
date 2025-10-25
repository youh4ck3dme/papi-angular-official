import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
  host: {
    // Initial hidden state for animation
    class: 'opacity-0 translate-y-8 transition-all duration-700 ease-out',
  }
})
export class RevealOnScrollDirective implements OnInit {
  private elementRef = inject(ElementRef);
  
  // Input for stagger delay in milliseconds
  delay = input<number>(0, { alias: 'appRevealOnScrollDelay' });
  
  // Input for root margin of the Intersection Observer
  rootMargin = input<string>('0px', { alias: 'appRevealOnScrollRootMargin' });

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: this.rootMargin(),
      threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'revealed' class which removes the initial hidden state
          setTimeout(() => {
            this.elementRef.nativeElement.classList.add('opacity-100', 'translate-y-0');
          }, this.delay());
          obs.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, options);

    observer.observe(this.elementRef.nativeElement);
  }
}
