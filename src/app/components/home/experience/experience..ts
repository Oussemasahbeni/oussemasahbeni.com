import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, HlmCardImports, HlmBadgeImports],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  experience = signal([
    {
      title: 'Software Developer',
      date: 'Jan 2024 - Present',
      company: 'Inspark, Ariana, Tunisia',
      current: true,
      gotBulletPoints: true,
      description: [
        'Maintaining enterprise-grade Angular/Spring Boot apps with Keycloak SSO and modular component architecture',
        'Refactored core services into reusable modules using domain-driven design, increasing maintainability by 30%',
        'Integrated RabbitMQ and WebSocket for real-time messaging; deployed and monitored apps via AWS and Azure',
      ],
      skills: [
        'angular',
        'spring boot',
        'keycloak',
        'rabbitmq',
        'websockets',
        'aws',
        'azure',
        'ddd',
        'docker',
        'git',
        'postgresql',
      ],
    },
    {
      title: 'Internship Trainee',
      date: 'Jan 2023 - Feb 2023',
      company: "Centre National de l'Informatique, Tunisia",
      current: false,
      gotBulletPoints: true,
      description: [
        'Developed internal task management platform adopted by 3 departments; improved tracking efficiency by 50%',
        'Configured role-based access via Spring Security; optimized PostgreSQL queries to reduce API latency by 35%',
      ],
      skills: [
        'spring boot',
        'spring security',
        'postgresql',
        'angular',
        'mysql',
      ],
    },
  ]);
}
