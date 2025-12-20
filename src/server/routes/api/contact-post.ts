import { defineEventHandler, readBody } from 'h3';
import { Resend } from 'resend';

const resend = new Resend(process.env['RESEND_API_KEY']);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return { success: false, message: 'Missing required fields' };
    }

    const { data, error } = await resend.emails.send({
      from: 'Oussema Portfolio <contact@oussemasahbeni.com>',
      to: ['oussemasahbeni300@gmail.com'],
      replyTo: email,
      subject: `New Contact: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>New Message from your Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('Server Error:', err);
    return { success: false, message: 'Internal Server Error' };
  }
});
