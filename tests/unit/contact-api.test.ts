import { describe, it, expect } from 'bun:test'
import contactHandler, { validateContactPayload } from '../../server/api/contact.post'

describe('Contact Server API Endpoint', () => {
  it('validates missing name with error', () => {
    expect(() => validateContactPayload({ name: '', email: 'test@example.com', message: 'Hello' })).toThrow('Name is required')
  })

  it('validates invalid email format with error', () => {
    expect(() => validateContactPayload({ name: 'Farhan', email: 'invalid-email', message: 'Hello' })).toThrow('Valid email address is required')
  })

  it('validates empty message with error', () => {
    expect(() => validateContactPayload({ name: 'Farhan', email: 'test@example.com', message: '   ' })).toThrow('Message must be at least 3 characters')
  })

  it('validates correct payload cleanly and returns sanitized data', () => {
    const valid = validateContactPayload({ name: '  Farhan Aditya  ', email: '  farhan@example.com  ', message: '  Hello Aulia! Great portfolio.  ' })
    expect(valid.name).toBe('Farhan Aditya')
    expect(valid.email).toBe('farhan@example.com')
    expect(valid.message).toBe('Hello Aulia! Great portfolio.')
  })

  it('rejects name exceeding 100 characters', () => {
    const longName = 'A'.repeat(101)
    expect(() => validateContactPayload({ name: longName, email: 'test@example.com', message: 'Valid message content' }))
      .toThrow('Name must be 100 characters or less')
  })

  it('rejects email exceeding 254 characters', () => {
    const longEmail = `${'a'.repeat(250)}@test.com`
    expect(() => validateContactPayload({ name: 'Farhan', email: longEmail, message: 'Valid message content' }))
      .toThrow('Valid email address is required')
  })

  it('rejects message exceeding 3000 characters', () => {
    const longMessage = 'M'.repeat(3001)
    expect(() => validateContactPayload({ name: 'Farhan', email: 'test@example.com', message: longMessage }))
      .toThrow('Message must be 3000 characters or less')
  })

  it('handles optional honeypot parameter', () => {
    const valid = validateContactPayload({
      name: 'Farhan',
      email: 'test@example.com',
      message: 'Hello Aulia!',
      honeypot: 'spam-bot-value'
    })
    expect(valid.honeypot).toBe('spam-bot-value')
  })
})

