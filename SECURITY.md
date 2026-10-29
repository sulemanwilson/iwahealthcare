# IWA Healthcare: security notes

## What this site is
A static React single-page app. There is **no backend, database, login or API key**. The contact and
consultation forms only build a `mailto:` / `wa.me` link; the visitor must press Send in their own email app or WhatsApp.

### Limits of a frontend-only form
- Delivery cannot be confirmed or guaranteed; the site never claims an enquiry was sent.
- No server-side validation, rate limiting, CAPTCHA or spam filtering exists. Client-side checks only help honest visitors.
- Anything typed is passed to the visitor's email app / WhatsApp, which are outside this site's control.
- Do not add a form-to-email service or API key without a proper backend or provider review.

## Environment
No variables are needed. Anything prefixed `VITE_` is public in the built JavaScript. Never put secrets in it.

## HTTP security headers (set at the host, not in HTML)
Not deployed from this repo, so no host config file is included. Add these where the site is served
(example values for the current assets: self-hosted JS/CSS/fonts, images from res.cloudinary.com):

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://res.cloudinary.com; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Strict-Transport-Security: max-age=31536000; includeSubDomains   (only once HTTPS works on every subdomain)
```
`'unsafe-inline'` in `style-src` is needed only for React inline `style` attributes if any are added; it is currently unused, so try removing it and test.
Re-test the CSP after any change to fonts, images, analytics or embeds. Serve over HTTPS only and redirect HTTP to HTTPS.
Do not publish `.env*`, `.git`, backups or source maps.

## Dependencies
Run `npm audit` periodically. Remaining advisories need major upgrades (Vite 6+, Tailwind 4, React Router 7); schedule and test them separately.
