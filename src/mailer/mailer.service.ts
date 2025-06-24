import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mrasad.apex@gmail.com',
        pass: 'nflc xltk lnwo ados',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: `"Crypto Rig" <mrasad.apex@gmail.com>`,
      to,
      subject,
      html: text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
