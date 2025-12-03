import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';

/**
 * This directive emits an event when a click outside the element is detected.
 *
 * Example usage:
 * <div (clickOutside)="close()"></div>
 */
@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  // Outputs an event when a click outside is detected
  readonly clickOutside = output<Event>();

  ngOnInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        // Filter out clicks that occur inside the element , so that we only emit the event when a click outside is detected
        filter(
          (event: Event) =>
            !this.elementRef.nativeElement.contains(event.target)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: Event) => {
        this.clickOutside.emit(event);
      });
  }
}
