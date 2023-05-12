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
