import { RouteMeta } from '@analogjs/router';
import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheckCircle, lucideExternalLink, lucideMail, lucideSend } from '@ng-icons/lucide';
import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { play } from 'cuelume';
import { ContactService } from '../../core/services/contact.service';
import { NoiseBackgroundComponent } from '../../shared/components/noise-background/noise-background';

export const routeMeta: RouteMeta = {
  title: 'Contact - Oussema Sahbeni',
};

@Component({
  selector: 'app-contact',
  imports: [
    FormField,
    HlmCardImports,
    HlmButtonImports,
    HlmBadgeImports,
    NgIcon,
    HlmInputImports,
    HlmTextareaImports,
    HlmSpinnerImports,
    HlmFieldImports,
    NoiseBackgroundComponent,
  ],
  providers: [
    provideIcons({
      lucideExternalLink,
      simpleGithub,
      radixLinkedinLogo,
      lucideMail,
      lucideSend,
      lucideCheckCircle,
    }),
  ],
  templateUrl: './index.page.html',
})
export default class Contact {
  private readonly contactService = inject(ContactService);

  protected readonly contactMethods = signal([
    {
      icon: 'lucideMail',
      title: 'Email',
      description: 'Send me an email for business inquiries',
      value: 'oussemasahbeni300@gmail.com',
      link: 'mailto:oussemasahbeni300@gmail.com',
      linkText: 'Send Email',
    },
    {
      icon: 'radixLinkedinLogo',
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      value: null,
      link: 'https://www.linkedin.com/in/oussema-sahbeni/',
      linkText: 'View Profile',
    },
    {
      icon: 'simpleGithub',
      title: 'GitHub',
      description: 'Check out my open source work',
      value: '@Oussemasahbeni',
      link: 'https://github.com/Oussemasahbeni',
      linkText: 'View Projects',
    },
  ]);
  protected readonly isSubmitting = signal(false);
  protected readonly submitMessage = signal<'success' | 'error' | null>(null);

  protected readonly contactModel = signal({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  protected readonly contactForm = form(this.contactModel, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Invalid email format' });
    required(schema.name, { message: 'Name is required' });
    required(schema.subject, { message: 'Subject is required' });
    required(schema.message, { message: 'Message is required' });
    minLength(schema.message, 10, {
      message: 'Message must be at least 10 characters',
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    const formData = this.contactForm();

    if (!formData.valid()) return;

    if (this.contactForm.honeypot().value() !== '') {
      this.submitMessage.set('success');
      this.contactForm().reset();
      return;
    }

    this.isSubmitting.set(true);

    this.contactService.contact(formData.value()).subscribe({
      next: () => {
        this.submitMessage.set('success');
        this.isSubmitting.set(false);
        play('success');
        this.resetForm();
      },
      error: () => {
        this.submitMessage.set('error');
        this.isSubmitting.set(false);
        play('error');
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
