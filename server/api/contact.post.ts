import { defineEventHandler, readBody, createError, getRequestIP } from 'h3'
import nodemailer from 'nodemailer'

export interface ContactInput {
  name: string
  email: string
  message: string
  honeypot?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Escapes HTML characters to prevent XSS and HTML injection in HTML emails
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

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
  if (name.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name must be 100 characters or less'
    })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
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
  if (message.length > 3000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message must be 3000 characters or less'
    })
  }

  const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : undefined

  return { name, email, message, honeypot }
}

// In-memory rate limiting: max 5 submissions per 15 minutes per IP
const ipRateMap = new Map<string, { count: number; expiresAt: number }>()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = ipRateMap.get(ip)

  if (!record || now > record.expiresAt) {
    ipRateMap.set(ip, { count: 1, expiresAt: now + 15 * 60 * 1000 })
    return true
  }

  if (record.count >= 5) {
    return false
  }

  record.count += 1
  return true
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

  // In production, reject unconfigured SMTP rather than faking delivery
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Mail service is not configured'
    })
  }

  // Fallback to JSON transport in dev/testing
  return nodemailer.createTransport({
    jsonTransport: true
  })
}

export default defineEventHandler(async (event) => {
  // IP Rate Limit check
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
  if (!checkRateLimit(clientIp)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again in 15 minutes.'
    })
  }

  const body = await readBody(event)
  const validData = validateContactPayload(body)

  // Honeypot spam trap: silently return success without sending
  if (validData.honeypot && validData.honeypot.length > 0) {
    return {
      success: true,
      message: 'Your message has been sent successfully! I will get back to you within 24 hours.'
    }
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'auliaggrr@gmail.com'
  const transporter = createTransporter()

  // Prevent CRLF injection in email subject
  const cleanSubjectName = validData.name.replace(/[\r\n\t]/g, ' ')

  // Escape HTML entities to prevent stored XSS / HTML injection in webmail
  const safeName = escapeHtml(validData.name)
  const safeEmail = escapeHtml(validData.email)
  const safeMessage = escapeHtml(validData.message).replace(/\n/g, '<br/>')

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_FROM || 'noreply@auliaggr.com'}>`,
      replyTo: validData.email,
      to: toEmail,
      subject: `New Inquiry from ${cleanSubjectName} - Portfolio`,
      text: `Name: ${validData.name}\nEmail: ${validData.email}\n\nMessage:\n${validData.message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2>New Contact Inquiry from Portfolio</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 4px solid #EC8F8D; padding: 12px 16px; margin: 0;">
            ${safeMessage}
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
