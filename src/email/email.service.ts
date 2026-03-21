import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendVerificationEmail(email: string, name: string, status: string, firstPart: string,reason?: string) {
    const subject = status === 'APPROVED' ? 'Your account has been approved!' : 'Account verification update';
    
     const res = await this.resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: email,
      subject: subject,
      html: `
        <h1>Hello ${name},</h1>
        <p>${firstPart}: <strong>${status}</strong>.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>Best regards,<br>Parking App Team</p>
      `,
    });
  }
}