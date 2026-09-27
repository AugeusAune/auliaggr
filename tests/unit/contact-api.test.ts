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
})
