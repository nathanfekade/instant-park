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

  async sendParkingAvenueOwnerCreatedEmail(email: string, name: string, username: string, passsword: string) {
    const subject = "Welcome to Park Request | Action Required: Secure Your Account"
    
     const res = await this.resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: email,
      subject: subject,
      html: `
        <h1>Hello ${name},</h1>
        <p>Your account for Park Request has been successfully created.
         You can now log in using the credentials provided below or 
         those you established during the sign-up process.</p>
        <p>Your Login Details</p>
        <p>UserName: ${username}</p>
        <p>Password: ${passsword}</p>

        <p>⚠️ Required Action: Update Your Password</p>
        <p>To ensure your account remains secure, our policy requires 
          all new users to update their password upon their first login. 
          If a temporary password was assigned to you, please change it immediately.
        </p>



        `,
    });
    console.log(res)
  }
}