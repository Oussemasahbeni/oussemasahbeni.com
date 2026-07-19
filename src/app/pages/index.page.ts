import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { AboutMe } from '../components/home/about-me/about-me';
import { Contact } from '../components/home/contact/contact';
import { Experience } from '../components/home/experience/experience.';
import { FeaturedBlogs } from '../components/home/featured-blogs/featured-blogs';
import { Hero } from '../components/home/hero/hero.';
import { Projects } from '../components/home/projects/projects';
import { NoiseBackgroundComponent } from '../shared/components/noise-background/noise-background';

export const routeMeta: RouteMeta = {
  title: 'Oussema Sahbeni | Full Stack Developer',
};

@Component({
  selector: 'app-home',
  imports: [Hero, AboutMe, Experience, Projects, FeaturedBlogs, Contact, NoiseBackgroundComponent],

  template: `
    <app-noise-background />
    <app-hero />
    <div class="mx-auto flex max-w-7xl scroll-mt-24 flex-col gap-20 px-6 pb-24 sm:px-8">
      <app-about-me />
      <app-experience />
      <app-projects />
      <app-featured-blogs />
      <app-contact />
    </div>
  `,
})
export default class Home {}
