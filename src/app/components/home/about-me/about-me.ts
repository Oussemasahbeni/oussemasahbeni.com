import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDumbbell, lucideFolders, lucideTrendingUp, lucideUsers } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { SpotlightColorDirective, SpotlightDirective } from '../../../shared/directives/spotlight.directive';
import { NgOptimizedImage } from '@angular/common';

interface TechStack {
  name: string;
  icon: string;
  title: string;
}

interface GitHubData {
  public_repos: number;
  followers: number;
}

@Component({
  selector: 'app-about-me',
  imports: [HlmCardImports,NgOptimizedImage, NgIcon, SpotlightDirective, SpotlightColorDirective],
  providers: [
    provideIcons({
      lucideUsers,
      lucideFolders,
      lucideTrendingUp,
      lucideDumbbell,
    }),
  ],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css'],
})
export class AboutMe {
  protected readonly yearsExperience = signal(2);
  protected readonly usersServed = signal(1000);
  protected readonly projectsCompleted = signal(4);
  protected readonly languagesSpoken = signal(3);

  protected readonly githubData = httpResource<GitHubData>(() => `https://api.github.com/users/Oussemasahbeni`);

  protected readonly techStack = signal<TechStack[]>([
    {
      name: 'Angular',
      icon: 'https://img.icons8.com/?size=48&id=6SWtW8hxZWSo&format=png',
      title: 'Angular - TypeScript-based web framework',
    },
    {
      name: 'Spring Boot',
      icon: 'https://img.icons8.com/?size=48&id=90519&format=png',
      title: 'Spring Boot - Java enterprise framework',
    },
    {
      name: 'Java',
      icon: 'https://img.icons8.com/?size=100&id=GPfHz0SM85FX&format=png&color=000000',
      title: 'Java - Programming language',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://img.icons8.com/?size=48&id=38561&format=png',
      title: 'PostgreSQL - Advanced relational database',
    },
    {
      name: 'MongoDB',
      icon: 'https://img.icons8.com/?size=48&id=8rKdRqZFLurS&format=png',
      title: 'MongoDB - NoSQL document database',
    },
    {
      name: 'Docker',
      icon: 'https://img.icons8.com/?size=48&id=cdYUlRaag9G9&format=png',
      title: 'Docker - Containerization platform',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://img.icons8.com/?size=48&id=CIAZz2CYc6Kc&format=png',
      title: 'Tailwind CSS - Utility-first CSS framework',
    },
    {
      name: 'Keycloak',
      icon: 'https://img.icons8.com/fluency/48/key-cloak.png',
      title: 'Keycloak - Identity and access management',
    },
    {
      name: 'Apache Kafka',
      icon: 'https://img.icons8.com/?size=48&id=fOhLNqGJsUbJ&format=png',
      title: 'Apache Kafka - Distributed streaming platform',
    },
    {
      name: 'RabbitMQ',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg',
      title: 'RabbitMQ - Message broker',
    },
    {
      name: 'Prometheus',
      icon: 'https://img.icons8.com/?size=48&id=lOqoeP2Zy02f&format=png',
      title: 'Prometheus - Monitoring and alerting toolkit',
    },
    {
      name: 'Grafana',
      icon: 'https://img.icons8.com/?size=48&id=9uVrNMu3Zx1K&format=png',
      title: 'Grafana - Analytics and monitoring platform',
    },
    {
      name: 'Node.js',
      icon: 'https://img.icons8.com/?size=48&id=hsPbhkOH4FMe&format=png',
      title: 'Node.js - JavaScript runtime environment',
    },
    {
      name: 'TypeScript',
      icon: 'https://img.icons8.com/?size=48&id=uJM6fQYqDaZK&format=png',
      title: 'TypeScript - Typed JavaScript superset',
    },
    {
      name: 'Git',
      icon: 'https://img.icons8.com/?size=48&id=20906&format=png',
      title: 'Git - Version control system',
    },
    {
      name: 'AWS',
      icon: 'https://img.icons8.com/?size=100&id=G0CnLqqcRBXl&format=png&color=000000',
      title: 'AWS - Amazon Web Services cloud platform',
    },
  ]);
}
