import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDumbbell, lucideFolders, lucideGitCommitHorizontal, lucideUsers } from '@ng-icons/lucide';
import {
  simpleAngular,
  simpleApachekafka,
  simpleCamunda,
  simpleDocker,
  simpleGit,
  simpleGrafana,
  simpleKeycloak,
  simpleKubernetes,
  simpleNodedotjs,
  simpleOpenjdk,
  simplePostgresql,
  simplePrometheus,
  simpleRabbitmq,
  simpleRedhatopenshift,
  simpleSpringboot,
  simpleTailwindcss,
  simpleTanstack,
  simpleTypescript,
} from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface TechStack {
  name: string;
  icon: string;
}

interface GitHubData {
  public_repos: number;
  followers: number;
}

interface ContributionsData {
  total: Record<string, number>;
}

interface Stat {
  icon: string;
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-about-me',
  imports: [HlmButtonImports, NgIcon],
  providers: [
    provideIcons({
      simpleTypescript,
      simpleAngular,
      simpleSpringboot,
      simpleOpenjdk,
      simplePostgresql,
      simpleDocker,
      simpleTailwindcss,
      simpleKeycloak,
      simpleApachekafka,
      simpleRabbitmq,
      simplePrometheus,
      simpleGrafana,
      simpleNodedotjs,
      simpleGit,
      simpleRedhatopenshift,
      simpleKubernetes,
      simpleCamunda,
      simpleTanstack,
      lucideUsers,
      lucideFolders,
      lucideGitCommitHorizontal,
      lucideDumbbell,
    }),
  ],
  templateUrl: './about-me.html',
})
export class AboutMe {
  protected readonly githubData = httpResource<GitHubData>(() => `https://api.github.com/users/Oussemasahbeni`);

  protected readonly contributions = httpResource<ContributionsData>(
    () => `https://github-contributions-api.jogruber.de/v4/Oussemasahbeni?y=all`
  );

  protected readonly stats = computed<Stat[]>(() => {
    const gh = this.githubData.value();
    const contrib = this.contributions.value();
    const totalContributions = contrib ? Object.values(contrib.total).reduce((sum, n) => sum + n, 0) : undefined;

    return [
      { icon: 'lucideFolders', value: gh?.public_repos ?? '—', label: 'Repositories' },
      { icon: 'lucideUsers', value: gh?.followers ?? '—', label: 'Followers' },
      { icon: 'lucideGitCommitHorizontal', value: totalContributions?.toLocaleString() ?? '—', label: 'Contributions' },
      { icon: 'lucideDumbbell', value: '80kg', label: 'Bench PR' },
    ];
  });

  protected readonly techStack = signal<TechStack[]>([
    {
      name: 'Angular',
      icon: 'simpleAngular',
    },
    {
      name: 'Spring Boot',
      icon: 'simpleSpringboot',
    },
    {
      name: 'Java',
      icon: 'simpleOpenjdk',
    },
    {
      name: 'PostgreSQL',
      icon: 'simplePostgresql',
    },
    {
      name: 'Docker',
      icon: 'simpleDocker',
    },
    {
      name: 'Tailwind CSS',
      icon: 'simpleTailwindcss',
    },
    {
      name: 'Keycloak',
      icon: 'simpleKeycloak',
    },
    {
      name: 'Apache Kafka',
      icon: 'simpleApachekafka',
    },
    {
      name: 'RabbitMQ',
      icon: 'simpleRabbitmq',
    },
    {
      name: 'Prometheus',
      icon: 'simplePrometheus',
    },
    {
      name: 'Grafana',
      icon: 'simpleGrafana',
    },
    {
      name: 'Node.js',
      icon: 'simpleNodedotjs',
    },
    {
      name: 'TypeScript',
      icon: 'simpleTypescript',
    },
    {
      name: 'Git',
      icon: 'simpleGit',
    },
    {
      name: 'Openshift',
      icon: 'simpleRedhatopenshift',
    },
    {
      name: 'Kubernetes',
      icon: 'simpleKubernetes',
    },
    {
      name: 'Camunda',
      icon: 'simpleCamunda',
    },
    {
      name: 'Tanstack',
      icon: 'simpleTanstack',
    },
  ]);
}
