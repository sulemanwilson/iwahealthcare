/** Shared input limits and sanitising for the enquiry forms (values end up in mailto: / wa.me URLs). */
export const FIELD_MAX = { name: 100, email: 254, phone: 20, specialty: 100 } as const

// C0/C1 control characters, line/paragraph separators and bidi override/isolate marks.
// These have no place in a name, phone number or email and can be used to spoof or mangle the message.
const UNSAFE = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u2028\u2029\u202A-\u202E\u2066-\u2069]/g

/** Single-line value: strips unsafe characters, collapses whitespace and trims. */
export const cleanLine = (v: string) => v.replace(UNSAFE, '').replace(/\s+/g, ' ').trim()

/** Multi-line value: keeps line breaks, strips unsafe characters, limits blank-line runs and trims. */
export const cleanMultiline = (v: string) =>
  v.replace(/\r\n?/g, '\n').replace(UNSAFE, '').replace(/\n{3,}/g, '\n\n').trim()
