import { afterNextRender, Directive, DestroyRef, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InView {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  // Optional settings. If you don't set them, the defaults are used.
  readonly inViewRoot = input<Element | null>(null);
  readonly inViewRootMargin = input('0px');
  readonly inViewThreshold = input(0);

  // Fires when the element becomes visible.
  readonly inView = output<void>();

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.inView.emit();
          }
        },
        {
          root: this.inViewRoot(),
          rootMargin: this.inViewRootMargin(),
          threshold: this.inViewThreshold(),
        },
      );

      observer.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
