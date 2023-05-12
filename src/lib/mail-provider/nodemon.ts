import { env } from '@/env'
import nodemailer from 'nodemailer'
import { EmailServiceProvider, SendEmailDTO, SendEmailResponse } from './mail-provider'

export class NodeMailerService implements EmailServiceProvider {
  async sendEmail({ from, html, subject, text, to }: SendEmailDTO): Promise<SendEmailResponse> {
    const transporter = nodemailer.createTransport({
      host: env.EMAIL_SERVER,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.EMAIL_USERNAME,
        pass: env.EMAIL_KEY
      }
    })

    try {
      await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
      })

      return {
        status: 200,
        message: 'Email Successfuly sent'
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Server Error'
      }
    }
  }
}

// async function main(): Promise<void> {
//   const transporter = nodemailer.createTransport({
//     host: env.EMAIL_SERVER,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: env.EMAIL_USERNAME,
//       pass: env.EMAIL_KEY
//     }
//   })

//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: 'bar@example.com, baz@example.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>' // html body
//   })

//   console.log('Message sent: %s', info.messageId)
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error)
