import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideLock } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Project {
  name: string;
  type: string;
  description: string;
  techs: string[];
  website: string | null;
  highlights: string[];
  image?: string;
  video?: string;
}

@Component({
  selector: 'app-projects',
  imports: [HlmButtonImports, HlmBadgeImports, NgIcon, NgOptimizedImage],
  providers: [
    provideIcons({
      lucideArrowUpRight,
      lucideLock,
    }),
  ],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = signal<Project[]>([
    {
      name: 'Konnect Spring Boot Starter',
      type: 'Open Source Library',
      description:
        'A robust Spring Boot starter for integrating with the Konnect Payment Gateway. Handles low-level HTTP communication, authentication, and error handling with production-grade features like auto-configuration, webhook handling, and resilience patterns.',
      techs: ['spring', 'maven', 'resilience4j', 'junit', 'java'],
      website: 'https://github.com/Oussemasahbeni/konnect-spring-boot-starter',
      image: 'images/projects/konnect.png',
      highlights: [
        'Auto-configuration for Spring Boot',
        'Secure webhook handling',
        'Payment verification utilities',
        'Built-in rate limiting & retries',
        'Published to Maven Central',
      ],
    },
    {
      name: 'Keycloakify Shadcn Starter',
      type: 'Keycloak Theme + Visual Editor',
      description:
        'A production-ready Keycloak login theme built with React, TypeScript, Tailwind CSS v4, shadcn/ui and Keycloakify v11 — plus a visual editor to tweak layout, colors, fonts and branding live and export a deployable .jar, no FreeMarker required.',
      techs: ['react', 'typescript', 'tailwindcss', 'shadcn', 'keycloakify'],
      website: 'https://keycloakify-shadcn-starter-editor.vercel.app/',
      image: 'images/projects/keycloakify-editor.png',
      highlights: [
        'Live visual theme editor with .jar export',
        'All 35+ Keycloak login pages covered',
        '16+ social login providers pre-styled',
        'Dark mode, RTL and 30 locales',
        'Custom jsx-email templates',
      ],
    },
    {
      name: 'Spartan Admin Dashboard',
      type: 'Open Source Angular Library',
      description:
        'An open-source Angular admin dashboard library built with Angular, Tailwind CSS and spartan/ui. Ships dashboards, TanStack-powered data tables, calendars, chat UIs, authentication pages and Jira-like task boards, with full RTL and multi-language support.',
      techs: ['angular', 'tailwindcss', 'spartan', 'tanstack'],
      website: 'https://github.com/Oussemasahbeni/spartan-admin-dashboard',
      image: 'images/projects/spartan-dasbhoard.png',
      highlights: [
        'Dashboards and analytics widgets',
        'TanStack-powered data tables',
        'Calendars, chat and Jira-like boards',
        'Auth pages, RTL and i18n',
        'Built on Angular + spartan/ui',
      ],
    },
  ]);
}
