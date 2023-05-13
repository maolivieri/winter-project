import { NodeMailerService } from './nodemon'
import { SendGridService } from './sendgrid'

export interface EmailServiceProvider {
  sendEmail: (data: SendEmailDTO) => Promise<SendEmailResponse>
}

export interface SendEmailDTO {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

export interface SendEmailResponse {
  status: number
  message: string
}

export class EmailProvider {
  constructor(private readonly serviceProvider: EmailServiceProvider) {}

  async execute(data: SendEmailDTO): Promise<SendEmailResponse> {
    return await this.serviceProvider.sendEmail(data)
  }
}

export function makeEmailProvider(provider: 'sendgrid' | 'nodemailer'): EmailProvider {
  const service = provider === 'nodemailer' ? new SendGridService() : new NodeMailerService()
  const sendEmail = new EmailProvider(service)

  return sendEmail
}
