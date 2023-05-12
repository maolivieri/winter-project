import sgMail from '@sendgrid/mail'

import { env } from '@/env'
import { EmailServiceProvider, SendEmailDTO, SendEmailResponse } from '.'

export class SendGridService implements EmailServiceProvider {
  async sendEmail({ from, html, subject, text, to }: SendEmailDTO): Promise<SendEmailResponse> {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(env.SENDGRID_API_KEY)

    try {
      await sgMail.send({ from, html, subject, text, to })
      return {
        status: 200,
        message: 'sucess'
      }
    } catch (err) {
      return {
        status: 500,
        message: JSON.stringify(err)
      }
    }
  }
}
