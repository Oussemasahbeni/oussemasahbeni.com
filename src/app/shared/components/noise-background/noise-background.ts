import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import {
  Application,
  Graphics,
  Particle,
  ParticleContainer,
  Texture,
} from 'pixi.js';
import { createNoise3D } from 'simplex-noise';

@Component({
  selector: 'app-noise-background',
  template: `
    <div
      #container
      class="fixed inset-0 pointer-events-none -z-10 dark:invert"
    ></div>
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoiseBackgroundComponent {
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly containerRef =
    viewChild.required<ElementRef<HTMLDivElement>>('container');

  // Pixi
  private app: Application | null = null;
  private readonly noise3d = createNoise3D();
  private points: {
    x: number;
    y: number;
    opacity: number;
    particle: Particle;
  }[] = [];
  private existingPoints = new Set<string>();
  private dotTexture: Texture | null = null;
  private resizeTimeout: any;

  // Controls how "zoomed in" the noise patterns are
  private readonly SCALE = 200;
  // How far the dots travel from their origin point
  private readonly LENGTH = 5;
  // The distance (in pixels) between each dot in the grid.
  private readonly SPACING = 15;

  // Pre-calculated inverse scale for performance
  private readonly INV_SCALE = 1 / this.SCALE;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => this.setup());
    });
  }

  private async setup() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Initialize Pixi
    this.app = new Application();
    await this.app.init({
      backgroundAlpha: 0,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      width: w,
      height: h,
      eventMode: 'none',
      autoDensity: true,
      // Power preference helps conserve battery on laptops
      powerPreference: 'high-performance',
    });

    // Attach to DOM
    this.containerRef().nativeElement.appendChild(this.app.canvas);

    // Setup Particle Container
    const particleContainer = new ParticleContainer({
      dynamicProperties: {
        position: true,
        alpha: true,
      },
    });
    this.app.stage.addChild(particleContainer);

    this.dotTexture = this.createDotTexture(this.app);
    this.addPoints(w, h, this.dotTexture, particleContainer);

    const onResize = () => this.handleResize();
    window.addEventListener('resize', onResize);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', onResize);
      if (this.app) {
        this.app.destroy(true, {
          children: true,
          texture: true,
          textureSource: true,
        });
      }
    });

    //  Optimized Animation Loop
    this.app.ticker.add(() => {
      // Use a consistent time scale
      const t = Date.now() * 0.0001;

      // Cache length locally to avoid property lookup in loop
      const pointsLen = this.points.length;

      for (let i = 0; i < pointsLen; i++) {
        const p = this.points[i];
        const { x, y, opacity, particle } = p;

        // Use pre-calculated inverse scale (multiplication is faster than division)
        const noiseInputX = x * this.INV_SCALE;
        const noiseInputY = y * this.INV_SCALE;

        // Inlining the force calculation to reduce function call overhead
        const n1 = this.noise3d(noiseInputX, noiseInputY, t);
        const rad = (n1 - 0.5) * 6.28318530718; // 2 * PI hardcoded

        const n2 = this.noise3d(noiseInputX, noiseInputY, t * 2);
        const len = (n2 + 0.5) * this.LENGTH;

        // Update particle
        particle.x = x + Math.cos(rad) * len;
        particle.y = y + Math.sin(rad) * len;

        const cosRad = Math.cos(rad);
        particle.alpha =
          ((cosRad > 0 ? cosRad : -cosRad) * 0.8 + 0.2) * opacity;
      }
    });
  }

  // Prevents destroying performance while dragging the window edge
  private handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (!this.app || !this.dotTexture) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      this.app.renderer.resize(w, h);

      const particleContainer = this.app.stage.children[0] as ParticleContainer;
      this.addPoints(w, h, this.dotTexture, particleContainer);
    }, 200);
  }

  private createDotTexture(app: Application): Texture {
    const g = new Graphics().circle(0, 0, 1).fill(0xcccccc);
    return app.renderer.generateTexture(g);
  }

  private addPoints(
    w: number,
    h: number,
    dotTexture: Texture,
    container: ParticleContainer
  ) {
    for (let x = -this.SPACING / 2; x < w + this.SPACING; x += this.SPACING) {
      for (let y = -this.SPACING / 2; y < h + this.SPACING; y += this.SPACING) {
        const id = `${x}-${y}`;
        if (this.existingPoints.has(id)) continue;

        this.existingPoints.add(id);

        const particle = new Particle(dotTexture);
        particle.anchorX = 0.5;
        particle.anchorY = 0.5;

        container.addParticle(particle);

        const opacity = Math.random() * 0.5 + 0.5;
        this.points.push({ x, y, opacity, particle });
      }
    }
  }
}
