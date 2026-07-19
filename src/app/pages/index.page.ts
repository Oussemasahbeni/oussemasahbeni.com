import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { FeaturedBlogs } from '../components/blog/featured-blogs/featured-blogs';
import { AboutMe } from '../components/home/about-me/about-me';
import { Experience } from '../components/home/experience/experience.';
import { Hero } from '../components/home/hero/hero.';
import { NoiseBackgroundComponent } from '../shared/components/noise-background/noise-background';

export const routeMeta: RouteMeta = {
  title: 'Oussema Sahbeni | Full Stack Developer',
};

@Component({
  selector: 'app-home',
  imports: [Hero, AboutMe, Experience, FeaturedBlogs, NoiseBackgroundComponent],

  template: `
    <app-noise-background />
    <app-hero />
    <div class="flex flex-col gap-20">
      <app-about-me />
      <app-experience />
      <app-featured-blogs />
    </div>
  `,
})
export default class Home {}
