// import { NodeMailerService } from './nodemon'

import { NodeMailerService } from './nodemon'
import { EmailProvider } from './repository'
import { SendGridService } from './sendgrid'

export default function makeEmailProvider(provider: 'sendgrid' | 'nodemailer'): EmailProvider {
  const service = provider === 'nodemailer' ? new SendGridService() : new NodeMailerService()
  const sendEmail = new EmailProvider(service)

  return sendEmail
}
