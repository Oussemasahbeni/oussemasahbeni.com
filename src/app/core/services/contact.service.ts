import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContactMessage } from '../../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);

  contact(contact: ContactMessage) {
    return this.http.post<void>('/api/contact-post', contact);
  }
}
