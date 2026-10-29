// Post-build: writes route-specific <head> metadata into dist HTML (no dependencies).
// Source of truth: src/content/seo.json (also used by src/components/Seo.tsx).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const cfg = JSON.parse(readFileSync('src/content/seo.json', 'utf8'))
const distHtml = readFileSync('dist/index.html', 'utf8')
const START = '<!--seo:start-->'
const END = '<!--seo:end-->'
if (!distHtml.includes(START) || !distHtml.includes(END)) throw new Error('SEO markers missing in index.html')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export const urlFor = (path) => (path === '/' ? `${cfg.siteUrl}/` : `${cfg.siteUrl}${path}`)

const jsonLd = () =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${cfg.siteUrl}/#organization`,
        name: cfg.siteName,
        legalName: cfg.organization.legalName,
        url: `${cfg.siteUrl}/`,
        logo: cfg.image,
        email: cfg.organization.email,
        telephone: cfg.organization.telephone,
        description: cfg.organization.description,
        areaServed: cfg.organization.areaServed,
        sameAs: cfg.organization.sameAs,
      },
      { '@type': 'WebSite', '@id': `${cfg.siteUrl}/#website`, name: cfg.siteName, url: `${cfg.siteUrl}/` },
    ],
  }).replace(/</g, '\\u003c')

function block(path) {
  const p = cfg.pages[path]
  const url = urlFor(path)
  const lines = [
    START,
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(cfg.siteName)}" />`,
    `<meta property="og:locale" content="${cfg.locale}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${cfg.image}" />`,
    `<meta property="og:image:alt" content="${esc(cfg.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${cfg.image}" />`,
  ]
  if (path === '/') lines.push(`<script type="application/ld+json" id="seo-jsonld">${jsonLd()}</script>`)
  lines.push(END)
  return lines.join('\n    ')
}

const re = new RegExp(`${START}[\\s\\S]*?${END}`)
for (const path of Object.keys(cfg.pages)) {
  const html = distHtml.replace(re, () => block(path))
  const file = path === '/' ? 'dist/index.html' : join('dist', path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  console.log('seo ->', file)
}
