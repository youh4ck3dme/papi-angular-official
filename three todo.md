# 🚀 ULTIMATE UNIVERSAL PWA & DEVOPS CHECKLIST

---

### **Varovanie: Typické Chyby & Problémy**
-   **Service Worker Cache:** Nesprávna cache stratégia môže viesť k tomu, že používatelia neuvidia nové verzie aplikácie. Vždy implementujte mechanizmus na refresh (napr. notifikácia "Nová verzia dostupná").
-   **Manifest a Ikony:** Neúplný `manifest.webmanifest` alebo chýbajúce veľkosti ikon (najmä 192px, 512px a maskovateľná ikona) zabránia inštalácii PWA.
-   **iOS Kompatibilita:** Safari má špecifické požiadavky na PWA (meta tagy `apple-mobile-web-app-capable`, splash screen ikony). Nezabudnite na ne.
-   **CI/CD Pipeline:** Zle nakonfigurované `secrets` (napr. API kľúče) môžu uniknúť do public repozitára. Vždy používajte šifrované secrets v GitHub Actions / GitLab CI.
-   **Lighthouse Audit:** Nízke skóre v Performance alebo Accessibility môže drasticky zhoršiť UX a SEO. Pravidelne auditujte a opravujte problémy.

---

## 1. Vstup & Základná Štruktúra (Scaffolding)

- [ ] **Src a config štruktúra podľa frameworku**
    -   **Popis:** Projekt musí mať logickú a štandardnú adresárovú štruktúru, ktorá uľahčuje orientáciu a údržbu.
    -   **Tipy & Kontext:**
        -   **Angular:** Používa `src/app`, `src/assets`, `src/environments`. Komponenty sú zvyčajne v `src/app/features` a `src/app/shared`.
        -   **Next.js:** Používa `app/` (App Router) alebo `pages/` (Pages Router) pre routing, `public/` pre statické súbory, `components/` pre UI komponenty.
        -   **Vite/Astro:** Zvyčajne `src/pages` pre routing, `src/components`, `src/layouts`, `public/` pre statické assety.
    -   **Audit Tip:** Overte, či je štruktúra konzistentná s oficiálnou dokumentáciou a best practices daného frameworku. Nový developer by sa mal v projekte zorientovať do 15 minút.

- [ ] **`index.html` / `main.ts` / `main.jsx` existuje a má root mount point**
    -   **Popis:** Hlavný vstupný súbor aplikácie musí obsahovať element, do ktorého sa aplikácia "mountuje".
    -   **Príklady:**
        -   HTML: `<div id="root"></div>` (React/Vite) alebo `<app-root></app-root>` (Angular).
        -   JS/TS: `ReactDOM.createRoot(document.getElementById('root')).render(...)` alebo `bootstrapApplication(AppComponent, ...)`
    -   **Audit Tip:** Skontrolujte, či v prehliadači nevzniká chyba "Target container is not a DOM element" alebo podobná. Aplikácia sa musí úspešne načítať.

- [ ] **`manifest.webmanifest` je kompletný a validný**
    -   **Popis:** Manifest súbor je kľúčový pre PWA funkcionalitu. Definuje, ako sa aplikácia správa po inštalácii.
    -   **Minimálne Požiadavky:** `name`, `short_name`, `start_url` (zvyčajne `/`), `scope` (zvyčajne `/`), `display: 'standalone'`, `theme_color`, `background_color`, `icons` (minimálne 192x192 a 512x512, plus "maskable" verzia).
    -   **Príklad Snippet (`manifest.webmanifest`):**
        ```json
        {
          "name": "PAPI Hair Design",
          "short_name": "PAPI",
          "start_url": "/",
          "scope": "/",
          "display": "standalone",
          "theme_color": "#D4AF37",
          "background_color": "#1a1a1a",
          "icons": [
            { "src": "/assets/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
            { "src": "/assets/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" },
            { "src": "/assets/icons/maskable-icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
          ]
        }
        ```
    -   **Odkazy:** [MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest), [Maskable Icons](https://web.dev/maskable-icons/)
    -   **Audit Tip:** V Chrome DevTools > Application > Manifest. Všetky polia by mali byť správne načítané a bez varovaní. Použite online validátor ako [manifest-validator.appspot.com](https://manifest-validator.appspot.com/).

- [ ] **Service Worker je generovaný, offline-ready a automaticky sa aktualizuje**
    -   **Popis:** Service Worker (SW) je skript, ktorý beží na pozadí a umožňuje offline prístup, push notifikácie a background synchronizáciu.
    -   **Tipy & Kontext:** Používajte knižnice, ktoré automatizujú generovanie SW, aby sa predišlo chybám.
    -   **Príklady Snippetov:**
        -   **Angular:** `ng add @angular/pwa` automaticky pridá a nakonfiguruje `ngsw-config.json`.
        -   **Next.js:** Použite `next-pwa` knižnicu a nakonfigurujte ju v `next.config.js`.
        -   **Vite:** `vite-plugin-pwa` je populárna voľba. Konfigurácia vo `vite.config.js`.
            ```javascript
            // vite.config.js
            import { VitePWA } from 'vite-plugin-pwa';
            export default {
              plugins: [
                VitePWA({
                  registerType: 'autoUpdate',
                  workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] }
                })
              ]
            };
            ```
    -   **Audit Tip:** V Chrome DevTools > Application > Service Workers. Skontrolujte, či je SW aktívny a beží. Vypnite sieť (offline režim) a obnovte stránku – mala by sa stále načítať z cache.

- [ ] **Favicon a všetky ikony pre platformy sú optimalizované**
    -   **Popis:** Aplikácia musí mať ikony pre rôzne platformy a kontexty (favikona, PWA ikona, Apple touch ikona).
    -   **Požiadavky:** `favicon.ico`, `apple-touch-icon.png` (180x180), `icon.svg` pre moderné prehliadače. Ikony v `manifest.webmanifest`.
    -   **Odkazy:** Použite nástroj ako [realfavicongenerator.net](https://realfavicongenerator.net/) na vygenerovanie všetkých potrebných formátov a HTML kódu.
    -   **Audit Tip:** Skontrolujte `head` sekciu v `index.html`, či obsahuje všetky potrebné `<link>` tagy pre ikony.

- [ ] **`robots.txt` & `sitemap.xml` sú generované a správne**
    -   **Popis:** `robots.txt` hovorí vyhľadávačom, ktoré stránky nemajú indexovať. `sitemap.xml` im pomáha objaviť všetky dôležité stránky.
    -   **Tipy & Kontext:** Mnohé frameworky (Next.js, Astro) majú vstavanú podporu alebo pluginy pre automatické generovanie sitemap.
    -   **Príklad Snippet (`robots.txt`):**
        ```
        User-agent: *
        Allow: /
        Disallow: /admin/
        Disallow: /cart/

        Sitemap: https://www.vasadomena.sk/sitemap.xml
        ```
    -   **Audit Tip:** Navštívte `vasadomena.sk/robots.txt` a `vasadomena.sk/sitemap.xml` a overte ich obsah. V Google Search Console môžete otestovať `robots.txt` a odoslať sitemapu.

---

## 2. Sieť, Caching & Offline

- [ ] **Service Worker cachuje stránky, assety a fonty podľa stratégie**
    -   **Popis:** SW musí efektívne cachovať zdroje, aby bola aplikácia rýchla a dostupná offline.
    -   **Stratégie:**
        -   `CacheFirst`: Ideálne pre statické assety (CSS, JS, obrázky, fonty).
        -   `NetworkFirst`: Vhodné pre dáta, ktoré musia byť čo najaktuálnejšie (napr. API volania).
        -   `StaleWhileRevalidate`: Skvelý kompromis. Vráti dáta z cache a na pozadí ich aktualizuje.
    -   **Príklad Snippet (Workbox - používaný `vite-plugin-pwa` a `next-pwa`):**
        ```javascript
        // In workbox config
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: { cacheName: 'images', expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 } } // 30 dní
          },
          {
            urlPattern: new RegExp('^https://fonts.googleapis.com'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' }
          },
          {
            urlPattern: new RegExp('^/api/'),
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache' }
          }
        ]
        ```
    -   **Audit Tip:** V Chrome DevTools > Application > Cache Storage. Preskúmajte obsah cache a overte, či sa assety ukladajú podľa definovaných pravidiel.

- [ ] **Offline fallback stránka je pekne navrhnutá a user-friendly**
    -   **Popis:** Ak používateľ navštívi stránku, ktorá nie je v cache a je offline, mal by vidieť priateľskú fallback stránku namiesto chyby prehliadača.
    -   **Tipy & Kontext:** Stránka by mala informovať o offline stave a prípadne zobraziť obsah, ktorý je dostupný.
    -   **Odkazy:** [Create an offline fallback page with Workbox](https://developer.chrome.com/docs/workbox/precaching-and-routing/offline-fallback-page)
    -   **Audit Tip:** Vypnite sieť, vymažte cache a navštívte podstránku, ktorú ste predtým nenavštívili. Musí sa zobraziť vaša custom offline stránka.

- [ ] **Automatický `skipWaiting` a `clientsClaim` s notifikáciou o aktualizácii**
    -   **Popis:** Keď sa nasadí nová verzia aplikácie, nový SW by sa mal aktivovať čo najskôr a prevziať kontrolu nad všetkými otvorenými kartami aplikácie.
    -   **Tipy & Kontext:** `skipWaiting` urýchli aktiváciu nového SW. `clientsClaim` zabezpečí, že nový SW prevezme kontrolu hneď. Používateľ by mal byť informovaný o dostupnej aktualizácii (napr. toast notifikácia s tlačidlom "Aktualizovať").
    -   **Audit Tip:** Otvorte aplikáciu. Nasadťe novú verziu. Obnovte stránku. Mala by sa objaviť notifikácia o aktualizácii. Po kliknutí by sa mala stránka znova načítať už s novou verziou.

- [ ] **Defer/lazy loading pre "heavy" assety**
    -   **Popis:** Obrázky, videá, iframy a komponenty, ktoré nie sú okamžite viditeľné, by sa mali načítať až vtedy, keď sa k nim používateľ "doscrolluje".
    -   **Príklady Snippetov:**
        -   **HTML (obrázky):** `<img src="..." loading="lazy" width="..." height="...">`
        -   **Angular:** `loadComponent: () => import('./features/home/home.component')` (lazy-loading routov), `NgOptimizedImage` direktíva.
        -   **React:** `const MyComponent = React.lazy(() => import('./MyComponent'))`
    -   **Audit Tip:** V Chrome DevTools > Network. Pri prvom načítaní stránky by sa mali sťahovať len assety "above the fold". Pri scrollovaní sledujte, ako sa postupne doťahujú ďalšie obrázky a JS chunky.

---

## 3. UX, Mobilita & Interaktivita

- [ ] **Kompletná responzivita**
    -   **Popis:** Aplikácia musí vyzerať a fungovať bezchybne na všetkých veľkostiach obrazoviek, od malých mobilov po 4K monitory.
    -   **Technológie:** CSS Grid, Flexbox, Media Queries, Container Queries.
    -   **Tipy & Kontext:** Dizajnujte "mobile-first". Používajte responzívne jednotky ako `rem`, `%`, `vw`.
    -   **Audit Tip:** V DevTools použite "Device Mode" na otestovanie rôznych breakpointov. Manuálne otestujte na reálnych zariadeniach (mobil, tablet, desktop).

- [ ] **Optimalizované interakcie pre dotykové zariadenia**
    -   **Popis:** Aplikácia musí správne reagovať na dotykové gestá (ťuknutie, potiahnutie, priblíženie).
    -   **Tipy & Kontext:** Tlačidlá musia byť dostatočne veľké (min. 48x48px). Vyhnite sa `hover` efektom, ktoré skrývajú dôležité funkcie.
    -   **Audit Tip:** Otestujte všetky interaktívne prvky na reálnom dotykovom zariadení. Overte, že gestá ako swipe fungujú intuitívne (napr. v karuseloch).

- [ ] **"Pixel perfect" a responzívna typografia**
    -   **Popis:** Vizuálny vzhľad aplikácie musí zodpovedať dizajnu. Veľkosť písma a prvkov sa musí prispôsobiť veľkosti obrazovky.
    -   **Technológie:** Používajte `rem` pre veľkosť písma a `clamp()` pre fluidnú typografiu.
    -   **Príklad Snippet (CSS):** `font-size: clamp(1rem, 2.5vw, 1.5rem);`
    -   **Audit Tip:** Použite rozšírenie ako PixelPerfect na porovnanie implementácie s dizajnovým návrhom.

- [ ] **Splash screen a status bar upravené pre Android/iOS**
    -   **Popis:** Po pridaní na domovskú obrazovku by sa mala aplikácia spúšťať s vlastnou splash screen a farbou status baru.
    -   **Implementácia:** Definuje sa v `manifest.webmanifest` (`theme_color`, `background_color`, `icons`) a v HTML `meta` tagoch pre iOS.
    -   **Príklad Snippet (HTML):**
        ```html
        <!-- iOS status bar -->
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <!-- iOS splash screens -->
        <link rel="apple-touch-startup-image" href="/splash.png">
        ```
    -   **Audit Tip:** Pridajte aplikáciu na domovskú obrazovku na Androide a iOS a spustite ju. Overte, či sa zobrazí správna ikona, splash screen a farba status baru.

---

## 4. SEO, Prístupnosť (Accessibility) & Meta Tagy

- [ ] **Kompletné meta tagy pre SEO a sociálne siete**
    -   **Popis:** `head` sekcia musí obsahovať meta tagy pre vyhľadávače (SEO) a pre zdieľanie na sociálnych sieťach (Open Graph, Twitter Cards).
    -   **Požiadavky:** `title`, `description`, `canonical URL`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`.
    -   **Odkazy:** [metatags.io](https://metatags.io/) na generovanie a preview.
    -   **Audit Tip:** Zdieľajte odkaz na Facebooku, Twitteri, LinkedIn a overte, či sa zobrazí správny náhľad (obrázok, titulok, popis).

- [ ] **`<meta name="viewport">` je vždy správne nastavené**
    -   **Popis:** Tento tag je kritický pre responzívny dizajn. Zabezpečuje, že sa stránka správne zobrazí na mobilných zariadeniach.
    -   **Príklad Snippet (HTML):** `<meta name="viewport" content="width=device-width, initial-scale=1">`
    -   **Audit Tip:** Overte v `index.html`. Absencia tohto tagu spôsobí, že mobilné prehliadače zobrazia desktopovú verziu stránky (oddialenú).

- [ ] **Prístupnosť (a11y): `alt` tagy, ARIA, focus, skip-linky**
    -   **Popis:** Aplikácia musí byť použiteľná pre ľudí so znevýhodnením (napr. používatelia čítačiek obrazovky).
    -   **Požiadavky:**
        -   Všetky `<img>` musia mať zmysluplný `alt` atribút.
        -   Používajte sémantické HTML (`<nav>`, `<main>`, `<button>`).
        -   Interaktívne prvky musia byť fokusovateľné pomocou klávesnice (`tabindex="0"`).
        -   Implementujte "skip to content" link pre navigáciu klávesnicou.
    -   **Odkazy:** [The A11Y Project](https://www.a11yproject.com/checklist/)
    -   **Audit Tip:** Skúste navigovať celou stránkou len pomocou klávesnice (Tab, Shift+Tab, Enter). Spustite automatizovaný audit (Lighthouse, axe DevTools).

- [ ] **CI pipeline spúšťa Lighthouse a testy prístupnosti (min. skóre 95%)**
    -   **Popis:** Každý build by mal automaticky prejsť auditom kvality.
    -   **Nástroje:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) pre GitHub Actions, [axe-core](https://github.com/dequelabs/axe-core) pre integračné testy.
    -   **Audit Tip:** Skontrolujte výsledky CI pipeline po každom commite. Build by mal zlyhať, ak skóre klesne pod stanovenú hranicu.

---

## 5. Konfigurácia, Build & CI/CD Pipeline

- [ ] **Žiadne duplicity v konfigurácii**
    -   **Popis:** Všetky konfiguračné hodnoty (napr. API URL, porty) by mali byť na jednom mieste a nie duplikované naprieč súbormi.
    -   **Riešenie:** Používajte `.env` súbory pre premenné prostredia a centrálny konfiguračný súbor (`angular.json`, `vite.config.js`).
    -   **Audit Tip:** Prehľadajte projekt a hľadajte hard-coded hodnoty, ktoré by mali byť v konfigurácii.

- [ ] **Build skripty sú jasne oddelené**
    -   **Popis:** `package.json` musí obsahovať jasne pomenované skripty pre všetky bežné úlohy.
    -   **Príklad (`package.json`):**
        ```json
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview",
          "lint": "eslint .",
          "test": "vitest"
        }
        ```
    -   **Audit Tip:** Skontrolujte, či sú skripty funkčné a konzistentné.

- [ ] **CI/CD workflow je funkčné a automatizované**
    -   **Popis:** Proces od pushnutia kódu do repozitára až po nasadenie na produkciu by mal byť plne automatizovaný.
    -   **Platformy:** GitHub Actions, GitLab CI, Vercel, Netlify, Firebase Hosting.
    -   **Príklad Snippet (GitHub Actions):**
        ```yaml
        name: Deploy to Production
        on:
          push:
            branches: [ main ]
        jobs:
          build-and-deploy:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v3
              - name: Setup Node.js
                uses: actions/setup-node@v3
                with:
                  node-version: '18'
              - run: npm install
              - run: npm run build --if-present
              - name: Deploy to Vercel
                uses: amondnet/vercel-action@v20
                with:
                  vercel-token: ${{ secrets.VERCEL_TOKEN }}
                  vercel-org-id: ${{ secrets.ORG_ID }}
                  vercel-project-id: ${{ secrets.PROJECT_ID }}
        ```
    -   **Audit Tip:** Pushnite malú zmenu do `main` branch a sledujte, či sa automaticky a bezchybne nasadí na produkciu.

- [ ] **CORS/HTTPS/redirects/cache headers sú správne nastavené na hostingu**
    -   **Popis:** Konfigurácia servera/hostingu musí byť správne nastavená pre bezpečnosť a výkon.
    -   **Tipy & Kontext:** Vercel a Netlify toto riešia z veľkej časti automaticky cez `vercel.json` alebo `netlify.toml` súbory. Pre vlastné servery (Docker, AWS) je potrebná manuálna konfigurácia (napr. v Nginx).
    -   **Audit Tip:** V Chrome DevTools > Network skontrolujte hlavičky odpovedí (response headers). Overte `content-security-policy`, `cache-control`, `strict-transport-security`.

---

## 6. Monitoring & Analytika

- [ ] **Nástroj na analytiku je pripravený (ak je potrebný)**
    -   **Popis:** Ak je potrebné sledovať návštevnosť a správanie používateľov, musí byť integrovaný analytický nástroj.
    -   **Nástroje:** Google Analytics 4, Plausible, Matomo, Vercel Analytics.
    -   **Tipy & Kontext:** Nezabudnite na GDPR – informujte používateľov a získajte súhlas (cookie banner).
    -   **Audit Tip:** Použite prehliadačové rozšírenie (napr. Google Analytics Debugger) na overenie, či sa eventy správne odosielajú.

- [ ] **Kontaktný formulár má validáciu, fallback a GDPR súhlas**
    -   **Popis:** Formuláre musia byť robustné, bezpečné a v súlade s predpismi.
    -   **Požiadavky:** Validácia na strane klienta (pre UX) aj servera (pre bezpečnosť). Checkbox pre súhlas so spracovaním osobných údajov.
    -   **Audit Tip:** Skúste odoslať formulár s neplatnými dátami. Skúste ho odoslať bez súhlasu. Overte, či sa dáta korektne doručia.

- [ ] **Push notifikácie majú permission flow a fallback**
    -   **Popis:** Ak aplikácia používa push notifikácie, musí si korektne vypýtať povolenie a spracovať prípady, kedy ho používateľ zamietne.
    -   **Nástroje:** Firebase Cloud Messaging, OneSignal.
    -   **Tipy & Kontext:** Žiadajte o povolenie v správnom kontexte (napr. po akcii používateľa), nie hneď po načítaní stránky.
    -   **Audit Tip:** Prejdite celým procesom povolenia notifikácií. V nastaveniach prehliadača povolenie zrušte a overte, že sa aplikácia správa korektne.

---

## 7. Testovanie, Revízia & Spracovanie Chýb

- [ ] **Pravidelný audit (Lighthouse/devtools)**
    -   **Popis:** Minimálne raz za týždeň by mal prebehnúť manuálny audit pomocou nástrojov v prehliadači.
    -   **Audit Tip:** V Chrome DevTools > Lighthouse. Spustite report pre Performance, Accessibility, Best Practices a SEO. Zamerajte sa na opravu červených a oranžových položiek.

- [ ] **Manuálne QA na cieľových zariadeniach a prehliadačoch**
    -   **Popis:** Aplikácia musí byť otestovaná na reálnych zariadeniach a prehliadačoch, ktoré používa cieľová skupina.
    -   **Nástroje:** BrowserStack alebo LambdaTest pre testovanie na širokej škále zariadení.
    -   **Audit Tip:** Vytvorte si testovací scenár (napr. registrácia, nákup, ...) a prejdite ho na iPhone (Safari), Androide (Chrome) a desktope (Chrome, Firefox, Edge).

- [ ] **Error Boundaries a logovanie chýb**
    -   **Popis:** Neočakávané chyby v aplikácii by nemali "zhodiť" celú stránku a mali by byť zaznamenané pre neskoršiu analýzu.
    -   **Nástroje:** Sentry, LogRocket, Datadog.
    -   **Príklad Snippet (React):**
        ```jsx
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <MyComponent />
        </ErrorBoundary>
        ```
    -   **Audit Tip:** Úmyselne vyvolajte chybu v kóde a overte, že sa zobrazí fallback UI a chyba sa zaznamená vo vašom logovacom nástroji.

- [ ] **Automatizované testy (unit/integration/e2e)**
    -   **Popis:** Kľúčové časti aplikácie by mali byť pokryté automatizovanými testami, aby sa predišlo regresiám.
    -   **Nástroje:** Jest/Vitest (unit), React Testing Library/Angular Testing Library (integration), Cypress/Playwright (e2e).
    -   **Audit Tip:** CI pipeline by mala spúšťať testy pri každom commite. Build musí zlyhať, ak testy neprejdú.

---

## 8. Finálny Release & Inštalovateľnosť

- [ ] **Aplikácia je inštalovateľná (Add to Home Screen)**
    -   **Popis:** Prehliadač by mal aktívne ponúknuť možnosť inštalácie PWA.
    -   **Požiadavky:** Validný manifest, service worker, HTTPS.
    -   **Audit Tip:** V Chrome DevTools > Application > Manifest. Kliknite na "Add to homescreen". Overte, či sa aplikácia správne nainštaluje a spustí v samostatnom okne.

- [ ] **Offline režim je odskúšaný aj pri zmene verzie**
    -   **Popis:** Prechod medzi verziami aplikácie musí byť plynulý aj v offline režime.
    -   **Audit Tip:** Nainštalujte PWA. Prejdite do offline režimu. Nasaďte novú verziu. Stále v offline režime, zatvorte a znova otvorte aplikáciu. Prejdite do online režimu. Aplikácia by mala detekovať novú verziu a ponúknuť aktualizáciu.

- [ ] **Deploy obsahuje iba finálne produkčné artefakty**
    -   **Popis:** Produkčný build nesmie obsahovať `source mapy`, `dev` závislosti, testovacie súbory alebo iné nepotrebné assety.
    -   **Audit Tip:** Skontrolujte obsah adresára, ktorý sa nasadzuje (`dist`, `.next`, `build`). Mal by obsahovať iba minifikované a optimalizované súbory.

- [ ] **`README.md` je detailné a aktuálne**
    -   **Popis:** Dokumentácia je kľúčová pre dlhodobú údržbu a pre nových členov tímu.
    -   **Minimálny obsah:** Popis projektu, inštrukcie na inštaláciu (`npm install`), spustenie dev servera (`npm run dev`), build (`npm run build`), testovanie (`npm run test`), popis konfigurácie a premenných prostredia.
    -   **Audit Tip:** Dajte novému kolegovi `README` a požiadajte ho, aby spustil projekt. Ak narazí na problém, `README` treba aktualizovať.

---

## 9. Framework-špecifické Optimalizácie

- [ ] **Next.js:** `next.config.js` je správne nakonfigurovaný (`images`, `rewrites`, `swcMinify: true`). Používa sa `next/image` pre optimalizáciu obrázkov.
- [ ] **Angular:** `angular.json` má správne nastavené `budgets` pre veľkosť bundlov. `production` konfigurácia je plne optimalizovaná (`aot: true`, `optimization: true`).
- [ ] **Vite/Astro:** `vite.config.js` obsahuje potrebné pluginy (napr. `vite-plugin-pwa`, optimalizácia obrázkov). `build` nastavenia sú optimalizované pre produkciu.
- [ ] **Vue/Svelte/Nuxt:** `nuxt.config`, `vue.config` alebo `svelte.config` sú správne nastavené pre PWA, SSR/SSG a optimalizáciu buildu.

---

### Zhrnutie & Finálna Kontrola Pred Release

- [ ] **Žiadny nevyužitý kód alebo assety v produkcii.** (Použite code-coverage a tree-shaking).
- [ ] **Všetky `secrets` a API kľúče sú bezpečne uložené a nie sú v kóde.**
- [ ] **Všetky externé služby (DB, API) majú nastavené produkčné verzie.**
- [ ] **Finálny audit: Všetko funguje, nič nechýba!**
