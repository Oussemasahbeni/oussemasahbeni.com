---
title: Testing the TOC Extraction
date: 2024-01-20
description: A dummy article designed to test table of contents generation, regex parsing, and sticky scrolling behavior in AnalogJS.
slug: testing-the-toc-extraction
tags:
  - Testing
  - AnalogJS
---

This is the introduction paragraph. The Table of Contents on the right should appear as soon as this content renders.

## Why _Formatting_ Matters

This header contains italics. In your TOC, it should appear as plain text ("Why Formatting Matters") without the asterisks or HTML tags if your regex strip logic is working correctly.

Here is some dummy text to make the page longer so you can test the scrolling behavior.

### Nested H3 Item

This item should be indented in your sidebar.

### Another H3 Item

This should also be indented.

## Code Block Edge Case

We need to ensure that the regex **does not** pick up comments inside code blocks.

```typescript
// ## This comment should NOT appear in the TOC
// ### Neither should this one
export class TestComponent {
  title = "Hello World";
}
```

If you see those fake headers in your TOC, you know the regex needs to be fixed to ignore fenced code blocks.

## Working with Angular Signals

Angular Signals provide a reactive primitive for managing state in your applications. They offer fine-grained reactivity and better performance compared to traditional change detection.

### Creating a Signal

Here's how you create a basic signal:

```typescript
import { signal, computed } from "@angular/core";

const count = signal(0);
const doubleCount = computed(() => count() * 2);

// Update the signal
count.set(5);
count.update((value) => value + 1);
```

### Using Signals in Components

Signals integrate seamlessly with Angular components:

```typescript
@Component({
  selector: "app-counter",
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>
    <button (click)="increment()">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((v) => v + 1);
  }
}
```

## Styling Best Practices

Good CSS architecture is crucial for maintainable applications. Let's explore some best practices.

### CSS Custom Properties

Custom properties (CSS variables) enable dynamic theming:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --background: #ffffff;
  --foreground: #1f2937;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
}

.button {
  background-color: var(--primary-color);
  color: var(--background);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: opacity 0.2s ease;
}

.button:hover {
  opacity: 0.9;
}
```

### Responsive Design Tips

Use modern CSS features for responsive layouts:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

@container (min-width: 600px) {
  .card {
    flex-direction: row;
  }
}
```

## Performance Optimization

Performance is key to great user experience. Here are some strategies.

### Lazy Loading

Lazy load routes and components that aren't immediately needed:

```typescript
export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () => import("./dashboard/dashboard.component").then((m) => m.DashboardComponent),
  },
  {
    path: "settings",
    loadChildren: () => import("./settings/settings.routes").then((m) => m.SETTINGS_ROUTES),
  },
];
```

### Image Optimization

Use Angular's `NgOptimizedImage` directive for automatic image optimization:

```typescript
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-hero",
  imports: [NgOptimizedImage],
  template: ` <img ngSrc="/images/hero.webp" width="1200" height="600" priority alt="Hero image" /> `,
})
export class HeroComponent {}
```

## Testing Strategies

Comprehensive testing ensures code reliability and maintainability.

### Unit Testing with Jest

Write focused unit tests for your services:

```typescript
describe("CalculatorService", () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService],
    });
    service = TestBed.inject(CalculatorService);
  });

  it("should add two numbers correctly", () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it("should handle negative numbers", () => {
    expect(service.add(-1, 1)).toBe(0);
  });
});
```

### Component Testing

Test component behavior and template rendering:

```typescript
describe("CounterComponent", () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it("should increment count when button is clicked", () => {
    const button = fixture.debugElement.query(By.css("button"));
    button.triggerEventHandler("click", null);

    expect(component.count()).toBe(1);
  });
});
```

## Accessibility Considerations

Building accessible applications ensures everyone can use your product.

### Semantic HTML

Always use semantic elements:

```html
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-20">January 20, 2024</time>
  </header>

  <main>
    <p>Article content goes here...</p>
  </main>

  <footer>
    <nav aria-label="Article navigation">
      <a href="/previous">Previous</a>
      <a href="/next">Next</a>
    </nav>
  </footer>
</article>
```

### ARIA Labels

Provide context for screen readers:

```html
<button aria-label="Close dialog" aria-pressed="false" (click)="closeDialog()">
  <span aria-hidden="true">&times;</span>
</button>

<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

## Conclusion

This article covered various topics to help test the TOC extraction functionality. We explored:

- **Angular Signals** for reactive state management
- **CSS best practices** including custom properties and responsive design
- **Performance optimization** techniques like lazy loading
- **Testing strategies** for both services and components
- **Accessibility considerations** for inclusive design

The sidebar TOC should now display all these sections correctly, with proper nesting for H3 elements under their parent H2 sections.

---

_Thanks for reading! If you found this helpful, consider sharing it with others._
