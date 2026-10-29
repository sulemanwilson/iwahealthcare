import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import cfg from '../content/seo.json'

type PageSeo = { title: string; description: string }
const pages = cfg.pages as Record<string, PageSeo>

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Keeps head metadata in sync with the current route (mirrors scripts/inject-seo.mjs). */
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const page = pages[path]
    if (!page) return
    const url = path === '/' ? `${cfg.siteUrl}/` : `${cfg.siteUrl}${path}`

    document.title = page.title
    setMeta('name', 'description', page.description)
    setMeta('name', 'robots', 'index, follow')
    setMeta('property', 'og:title', page.title)
    setMeta('property', 'og:description', page.description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', page.title)
    setMeta('name', 'twitter:description', page.description)

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url

    // Organization/WebSite data lives on the Home page only.
    if (path !== '/') document.getElementById('seo-jsonld')?.remove()
  }, [pathname])

  return null
}
