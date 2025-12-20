import { RouteMeta } from '@analogjs/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  email,
  Field,
  form,
  minLength,
  required,
} from '@angular/forms/signals';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCheckCircle,
  lucideExternalLink,
  lucideGithub,
  lucideLinkedin,
  lucideMail,
  lucideSend,
} from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { ContactService } from '../../core/services/contact.service';
import { NoiseBackgroundComponent } from '../../shared/components/noise-background/noise-background';

export const routeMeta: RouteMeta = {
  title: 'Contact - Oussema Sahbeni',
};

@Component({
  selector: 'app-contact',
  imports: [
    Field,
    HlmCardImports,
    HlmButtonImports,
    HlmBadgeImports,
    HlmIconImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmSpinnerImports,
    HlmFieldImports,
    NoiseBackgroundComponent,
  ],
  providers: [
    provideIcons({
      lucideExternalLink,
      lucideGithub,
      lucideLinkedin,
      lucideMail,
      lucideSend,
      lucideCheckCircle,
    }),
  ],
  templateUrl: './index.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Contact {
  private readonly contactService = inject(ContactService);

  readonly contactMethods = signal([
    {
      icon: 'lucideMail',
      title: 'Email',
      description: 'Send me an email for business inquiries',
      value: 'oussemasahbeni300@gmail.com',
      link: 'mailto:oussemasahbeni300@gmail.com',
      linkText: 'Send Email',
    },
    {
      icon: 'lucideLinkedin',
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      value: null,
      link: 'https://www.linkedin.com/in/oussema-sahbeni/',
      linkText: 'View Profile',
    },
    {
      icon: 'lucideGithub',
      title: 'GitHub',
      description: 'Check out my open source work',
      value: '@Oussemasahbeni',
      link: 'https://github.com/Oussemasahbeni',
      linkText: 'View Projects',
    },
  ]);
  readonly isSubmitting = signal(false);
  readonly submitMessage = signal<'success' | 'error' | null>(null);

  readonly contactModel = signal({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  readonly contactForm = form(this.contactModel, (schemePath) => {
    required(schemePath.email, { message: 'Email is required' });
    email(schemePath.email, { message: 'Invalid email format' });
    required(schemePath.name, { message: 'Name is required' });
    required(schemePath.subject, { message: 'Subject is required' });
    required(schemePath.message, { message: 'Message is required' });
    minLength(schemePath.message, 10, {
      message: 'Message must be at least 10 characters',
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    const formData = this.contactForm();

    if (!formData.valid()) return;

    if (this.contactModel().honeypot !== '') {
      console.log('Bot detected!');
      this.submitMessage.set('success');
      this.contactForm().reset();
      return;
    }

    this.isSubmitting.set(true);

    this.contactService.contact(formData.value()).subscribe({
      next: () => {
        this.submitMessage.set('success');
        this.isSubmitting.set(false);
        this.resetForm();
      },
      error: () => {
        this.submitMessage.set('error');
        this.isSubmitting.set(false);
      },
    });
  }

  resetForm() {
    this.contactForm().reset({
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    });
  }
  sendAnotherMessage() {
    this.resetForm();
    this.submitMessage.set(null);
  }
}
