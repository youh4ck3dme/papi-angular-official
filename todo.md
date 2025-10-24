# 🚀 ULTIMATE UNIVERSAL PWA TODO.md

## 1. Entry & scaffold

- [ ] **Src a config štruktúra podľa frameworku (src/, public/, assets/, pages/, app/ atď.)**
    - Tip: Next: pages/ alebo app/. Angular: src/. Astro/Vite: src/pages/.
- [ ] **index.html/main.ts/main.jsx/** existuje, má root React/Astro/Vue/Angular mount point 
- [ ] **manifest.json**: obsahuje min.:
    - name, short_name, start_url, scope, theme_color, background_color, icons (192, 512, maskable), display=standalone
    - Audit: Skontroluj validitu cez https://manifest-validator.appspot.com/
- [ ] **service worker**: generovaný, plne offline-ready, automaticky upgradovaný pri novom buildu
    - Snippet: Vite & React: vite-plugin-pwa, Angular: ng add @angular/pwa, Next: next-pwa.
- [ ] **favicon, all platform icons**, optimalizované + fallback fallback.ico
- [ ] **robots.txt & sitemap.xml**: generované podľa SEO guidelines/frameworku

---

## 2. Network, caching, offline

- [ ] Service worker cachuje stránky aj assets/fonsty podľa strategie (CacheFirst/NetworkFirst/StaleWhileRevalidate)
- [ ] Offline fallback page je pekne navrhnutá a user-friendly
- [ ] Automatický skipWaiting, clientsClaim, aj vlastné notification push update
- [ ] Defer loading heavy assets (lazy loading obrázky, code split)

---

## 3. UX, mobile, interactivity

- [ ] Kompletná responzivita: CSS grid/flex/containers/media queries/Breakpoints
- [ ] Touch, drag, swipe: framework-native interakcie pre všetky možnosti, optimalizované user agent detection
- [ ] Zabezpeč „perfect pixel“ a optimalizuj layout na device width (font responsive, rem, vw)
- [ ] Splash screen, status bar: upravené v manifest/metach pre Android/iOS

---

## 4. SEO, accessibility, meta

- [ ] Kompletné meta tagy: og:title, og:image, og:description, canonical, lang, author
- [ ] <meta name="viewport"> vždy správne nastavené
- [ ] Obrázky s alt, správne ARIA štítky, tabindex=0 pre fokus, skip-link pre klávesnicu
- [ ] CI pipeline beží Lighthouse, accessibility testy každý build (min. 95%)

---

## 5. Config, build, scripts, pipeline

- [ ] Nikde nie sú duplicity .env, config.js/.mjs, package.json, angular.json, vite.config.js…
- [ ] Build scripts sú jasne oddelené (dev, build, start, preview, prod, test, lint)
    - Príklad: npm run dev, npm run build, npm run start, npm run lint
- [ ] CI/CD workflow správne deployuje, pushuje, rolluje (GitHub Actions, Docker, Vercel, Firebase)
- [ ] CORS/HTTPS/redirects/cache headers/auth/set-cookie sekcia v configoch

---

## 6. Monitoring & analytics

- [ ] Google Analytics/Firebase/Matomo/Amplitude pripravené (ak treba)
- [ ] Kontaktný formulár: validácia, fallback, info pre GDPR/logovanie
- [ ] Push notifications: browser/OS permission & fallback (príklad: OneSignal, Firebase Messaging, VAPID key)

---

## 7. Testing, review, error handling

- [ ] Lighthouse/Google/devtools audit každý týždeň
- [ ] Manual QA: test na všetkých nastavených device / browser konfiguráciách
- [ ] Error boundaries a logovanie všetkých JS runtime exception, reporting
- [ ] Automatické testy: unit/integration/e2e/sklady test report

---

## 8. Final release & installability

- [ ] Appka je inštalovateľná (Add to Home Screen, shortcut, proper icons)
- [ ] Offline režim je odskúšaný aj pri zmene verzie build/service worker
- [ ] Deploy na hosting je bez errorov, s final public artifact-only build a všetkými assetmi
- [ ] README úplne detailné: build, dev, install, konfig, troubleshooting, contact, CONTRIBUTING.md

---

## 9. Framework-specific optimalizácie [Pridaj snippet pre všetky hlavné frameworky]

### Next.js
- [ ] next.config.js správne domains, images, swc config, rewrites
### Angular
- [ ] angular.json: nastavený projekt output, assets, styles, serviceWorker
### Vite/Astro
- [ ] vite.config.js: plugins, assets, public dir, PWA plugin config
### Vue/Svelte/Nuxt
- [ ] nuxt.config, vue.config správne meta/pluginy/dependencies

---

### Summary & pre-release sanity check
- [ ] Žiadny nevyužitý asset, žiadne dev/test artefakty v produkcii
- [ ] Zálohovaný config, deploy log, README aktualizované
- [ ] Final audit: everything works, nothing missed!

---

**Každý bod musí byť podrobne popísaný a overený – súbor three todo.md je jediný referenčný checklist pre každého developera pri každom release/build!** + Pripoj výstrahy na typické chyby a tipy na ich riešenie.