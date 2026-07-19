import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCheckCircle, lucideCopy, lucideExternalLink, lucideMail, lucideSend } from '@ng-icons/lucide';
import { radixLinkedinLogo } from '@ng-icons/radix-icons';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { play } from 'cuelume';
import { GITHUB_LINK, LINKEDIN_LINK } from '../../../core/constants';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [
    FormField,
    NgIcon,
    FormRoot,
    HlmCardImports,
    HlmButtonImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmSpinnerImports,
    HlmFieldImports,
  ],
  providers: [
    provideIcons({
      lucideExternalLink,
      simpleGithub,
      radixLinkedinLogo,
      lucideMail,
      lucideSend,
      lucideCheck,
      lucideCopy,
      lucideCheckCircle,
    }),
  ],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly contactService = inject(ContactService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly email = 'oussemasahbeni300@gmail.com';
  protected readonly githubLink = GITHUB_LINK;
  protected readonly linkedinLink = LINKEDIN_LINK;

  protected readonly emailCopied = signal(false);
  protected readonly submitMessage = signal<'success' | 'error' | null>(null);

  protected readonly contactModel = signal({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  protected readonly contactForm = form(
    this.contactModel,
    (schema) => {
      required(schema.email, { message: 'Email is required' });
      email(schema.email, { message: 'Invalid email format' });
      required(schema.name, { message: 'Name is required' });
      required(schema.subject, { message: 'Subject is required' });
      required(schema.message, { message: 'Message is required' });
      minLength(schema.message, 10, {
        message: 'Message must be at least 10 characters',
      });
    },
    {
      submission: {
        action: async () => {
          if (this.contactForm.honeypot().value() !== '') {
            this.submitMessage.set('success');
            this.contactForm().reset();
            return;
          }
          this.onSubmit();
        },
      },
    }
  );

  async copyEmail(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText(this.email);
      this.emailCopied.set(true);
      play('success');
      setTimeout(() => this.emailCopied.set(false), 2000);
    } catch {
      play('error');
    }
  }

  onSubmit(): void {
    this.contactService.contact(this.contactForm().value()).subscribe({
      next: () => {
        this.submitMessage.set('success');
        play('success');
        this.resetForm();
      },
      error: () => {
        this.submitMessage.set('error');
        play('error');
      },
    });
  }

  resetForm(): void {
    this.contactForm().reset({
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    });
  }

  sendAnotherMessage(): void {
    this.resetForm();
    this.submitMessage.set(null);
  }
}
