import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';

export const routeMeta: RouteMeta = {
  title: 'Page Not Found',
};

@Component({
  imports: [RouterLink, HlmButtonImports],
  host: {
    class: 'flex flex-col items-center justify-center min-h-screen gap-4 mt-4',
  },
  template: `
    <h2>Page Not Found</h2>

    <a hlmBtn variant="default" routerLink="/">Go Back Home</a>
  `,
})
export default class PageNotFoundComponent {}
