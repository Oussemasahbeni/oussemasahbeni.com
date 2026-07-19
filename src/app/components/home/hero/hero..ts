import { Component } from '@angular/core';
import { ButtonVariants, HlmButtonImports } from '@spartan-ng/helm/button';

export interface ActionButton {
  title: string;
  icon: string;
  variant: ButtonVariants['variant'];
  link: string;
}

@Component({
  selector: 'app-hero',
  imports: [HlmButtonImports],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: {
    class: 'block relative min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8',
  },
})
export class Hero {}
