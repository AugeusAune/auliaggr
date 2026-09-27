import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'

export interface ContactInput {
  name: string
  email: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactPayload(body: any): ContactInput {
  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid payload format'
    })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required'
    })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || !EMAIL_REGEX.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid email address is required'
    })
  }

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message || message.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message must be at least 3 characters'
    })
  }

  return { name, email, message }
}

export function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    })
  }

  // Fallback to JSON transport in dev/testing if SMTP is not configured
  return nodemailer.createTransport({
    jsonTransport: true
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const validData = validateContactPayload(body)

  const toEmail = process.env.CONTACT_TO_EMAIL || 'auliaggrr@gmail.com'
  const transporter = createTransporter()

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_FROM || 'noreply@auliaggr.com'}>`,
      replyTo: validData.email,
      to: toEmail,
      subject: `New Inquiry from ${validData.name} - Portfolio`,
      text: `Name: ${validData.name}\nEmail: ${validData.email}\n\nMessage:\n${validData.message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2>New Contact Inquiry from Portfolio</h2>
          <p><strong>Name:</strong> ${validData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${validData.email}">${validData.email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 4px solid #EC8F8D; padding: 12px 16px; margin: 0;">
            ${validData.message.replace(/\n/g, '<br/>')}
          </blockquote>
        </div>
      `
    })

    return {
      success: true,
      message: 'Your message has been sent successfully! I will get back to you within 24 hours.'
    }
  } catch (error: any) {
    console.error('Nodemailer send error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message. Please reach out directly via WhatsApp or email.'
    })
  }
})
