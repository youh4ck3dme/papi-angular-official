import { Injectable, signal, inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Stylist } from '../models';
import { FirebaseService } from './firebase.service';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  perex: string;
  content: string;
  authorId: string; // Link to Stylist ID
  publishDate: string;
  imageUrl: string; // For og:image
}

export interface BlogPostWithAuthor extends BlogPost {
  author: Stylist;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private firebaseService = inject(FirebaseService);

  private readonly posts = signal<BlogPost[]>([
    {
      id: 1,
      title: '„Môj príbeh v pár slovách – od ulice po svetové pódiá“',
      slug: 'moj-pribeh-v-par-slovach',
      authorId: 'papi',
      publishDate: '2024-07-15',
      imageUrl: 'https://picsum.photos/seed/papi-story/1200/630',
      perex: 'Volám sa Róbert Papcun, pochádzam z Košíc a dnes mám 35 rokov. Moja cesta ku kaderníctvu sa začala už v detstve – rád som sledoval, ako strihajú mojich rodičov. Fascinovalo ma, ako sa ľudia menia pred mojimi očami.',
      content: `
        <p class="mb-4">Volám sa Róbert Papcun, pochádzam z Košíc a dnes mám 35 rokov. Moja cesta ku kaderníctvu sa začala už v detstve – rád som sledoval, ako strihajú mojich rodičov. Fascinovalo ma, ako sa ľudia menia pred mojimi očami.</p>
        <p class="mb-4">Ako tínedžer som chodil s kamarátmi do salónov, čakal ich a sledoval, ako ich farbia a strihajú. Už vtedy som vedel, že tento svet ma priťahuje. Po večeroch som sa často modlil, aby som bol stále lepší a rástol v tom, čo milujem.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2007 – prvé nožnice a improvizácia</h2>
        <p class="mb-4">Amatérsky som strihal rodičov a kamarátov – v kočikárni, v blokoch a dokonca aj v podchodoch na uliciach, kde som sa učil improvizovať.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2008 – stretnutia s ľuďmi z okolia “beauty” sveta</h2>
        <p class="mb-4">Po ukončení školy som sa začal vážne zamýšľať nad tým, že sa stanem kaderníkom a začal som sa viac stretávať s ľuďmi z okolia beauty sveta.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2009 – prvý kurz a prvé zamestnanie</h2>
        <p class="mb-4">Prihlásil som sa na kadernícky kurz a koncom roka som nastúpil do svojho prvého salónu na sídlisku v Košiciach. Z kurzu som si veľa neodniesol, takže som musel improvizovať. Naučil som sa, že úsmev a dobrá komunikácia sú rovnako dôležité ako nožnice.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2010 – pánske účesy a barbering</h2>
        <p class="mb-4">Prestúpil som do kvalitnejšieho salónu, kde som sa stal najmladším kaderníkom. Ešte som nevynikal v dámskych službách, preto som sa sústredil na pánske účesy a barbering.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2011 – Taliansko a návrat domov</h2>
        <p class="mb-4">Odišiel som do Talianska, aby som si splnil sen – žiť a pracovať ako kaderník v zahraničí. Nebolo to jednoduché, prácu som nenašiel, ale toto obdobie ma naučilo húževnatosti a samostatnosti. Po 10 mesiacoch som sa vrátil domov, no v hlave som už mal jasný plán – dostať sa do najlepšieho salónu v mojom rodnom meste.</p>
        <p class="mb-4">Prišiel pohovor – a ja som tam vošiel sebavedome, s „talianskym prízvukom“, aby som pôsobil svetovo a zaujímavo. Chcel som ukázať, že som iný. Pamätám si, ako ma šéf posadil k prvému klientovi, aby som ukázal, čo viem. A prijali ma hneď v ten deň. Tento moment zmenil môj život – vedel som, že som na správnej ceste.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2012 – štúdium po Európe a tvrdá práca v top salóne</h2>
        <p class="mb-4">V tom čase som už pracoval v najprestížnejšom salóne v Košiciach. Nemohol som si len tak strihať a farbiť klientov podľa svojho gusta – každá služba vyžadovala absolvovanie oficiálnych kurzov a školení, ktoré potvrdzovali moju odbornosť.</p>
        <p class="mb-4">Vďaka mojím výsledkom – výkonu v salóne, spokojnosti klientov a silným tržbám – som dostával možnosť cestovať po Európe a zúčastňovať sa školení a workshopov ako odmenu a príležitosť zlepšovať sa. Za niektoré kurzy som si platil aj sám, pretože som vedel, že každá hodina strávená učením ma posúva ďalej.</p>
        <p class="mb-4">V tých rokoch som si uvedomil, že talent nestačí. Ak chceš rásť a byť skutočne dobrý, musíš investovať čas, energiu a často aj vlastné peniaze do seba. Každý deň som pracoval na sebe – strihal, farbil, študoval nové techniky a sledoval trendy, aby som bol pripravený na všetko, čo príde.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2013 – prvé súťaže</h2>
        <p class="mb-4">V novom salóne som rástol každým mesiacom. Začal som sa zúčastňovať súťaží, získavať prvé ocenenia a veriť si viac než kedykoľvek predtým.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2014 – módne prehliadky a vlastné show</h2>
        <p class="mb-4">Začal som česať módne prehliadky – od súkromných eventov až po Košice Fashion Week a Praha Fashion Week. Mal som vlastné minúty na pódiu, kde som prezentoval trendy, strihy a farby.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2015 – sen o vlastnom salóne</h2>
        <p class="mb-4">Mal som veľkú klientelu a začal som snívať o vlastnom priestore. Prestal som míňať, šetril som každý cent a sústredil sa iba na cieľ – otvoriť si raz svoj salón.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2016 – uznanie a mediálna pozornosť</h2>
        <p class="mb-4">Vyhral som lokálnu súťaž, objavil som sa v magazínoch a v módnych televíziách. Začali ma oslovovať iné salóny z celého Slovenska aj Česka.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2017 – prípravy na PAPI HAIR DESIGN</h2>
        <p class="mb-4">Rozhodol som sa, že je čas spraviť ďalší krok. Začal som pracovať na svojom sne a pripravovať všetko pre otvorenie vlastného salónu.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2018 – otvorenie PAPI HAIR DESIGN</h2>
        <p class="mb-4">Otvoril som PAPI HAIR DESIGN bez akejkoľvek finančnej pomoci, iba z nasporených peňazí. Stáva sa z neho miesto, kde sa nielen strihá a farbí, ale aj učí a inšpiruje.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2019 – rozvoj salónu a lokálne eventy</h2>
        <p class="mb-4">Začínam sa venovať rozvoju salónu a svojho tímu. Chodím česať a strihať na lokálne eventy, festivaly a prehliadky so svojím novým tímom, čím sa stále viac upevňuje reputácia PAPI HAIR DESIGN.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2020 – ambasádor GOLD HAIR CARE</h2>
        <p class="mb-4">Začala sa nová kapitola môjho života – reprezentujem značku po celom svete, vystupujem na pódiách pred stovkami kaderníkov a tvorím kolekcie, ktoré udávajú trendy.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2021 – vzdelávanie novej generácie</h2>
        <p class="mb-4">Začínam učiť mladé talenty v bratislavskej akadémii GOLD HAIR CARE a odovzdávam svoje skúsenosti tak, ako kedysi mňa učili moji mentori.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2022 – prvé veľké pódium v zahraničí</h2>
        <p class="mb-4">Vystupujem na pódiu na Malorke pred stovkami kaderníkov a predvádzam vlastnú show. Je to jeden z mojich najväčších životných momentov – sny sa plnia.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2023 – nové trendy a prestavba salónu</h2>
        <p class="mb-4">Spolu s tímom GOLD Hair Care tvoríme vlasové trendy a fotíme kolekcie po európskych mestách. Zároveň dávam môjmu salónu nový vizuál a reprezentatívny vzhľad hodný ambasádora značky GOLD Proffesional Haircare.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2024 – odovzdávanie remesla a ďalšie výzvy</h2>
        <p class="mb-4">Do salónu beriem mladého chalana, ktorý nikdy nedržal nožnice v ruke, a učím ho všetko od nuly. Do roka sa z neho stáva plnohodnotný barber. Sledujem, ako sa môj tím rozrastá, a prijímam ďalšiu veľkú výzvu, neustále rastieme, učíme sa nové techniky a pripravujeme ďalšie veľké projekty.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2025 – líder, mentor a inšpirácia</h2>
        <p class="mb-4">Dnes vediem silný tím a mám radosť z toho, že viacerí ľudia, ktorí kedysi pracovali ako moji zamestnanci, majú dnes vlastné úspešné salóny. Viem, že ich to inšpirovalo ísť si za svojimi snami, tak ako som si za nimi išiel ja.</p>
        <p class="mb-4">Motivujem mladých ľudí, školím po celom Slovensku a Česku a rodina je môj pevný základ – zdroj energie na nové výzvy.</p>
      `
    },
    {
      id: 2,
      title: '5 Tipov pre dokonalú Balayage, ktorá vydrží',
      slug: '5-tipov-pre-dokonalu-balayage',
      authorId: 'miska',
      publishDate: '2024-07-18',
      imageUrl: 'https://picsum.photos/seed/balayagetips/1200/630',
      perex: 'Balayage je umenie, ktoré si vyžaduje nielen zručnosť, ale aj správnu starostlivosť. Ako Creative Hair Artist vám prinášam 5 osvedčených tipov, ako si udržať vašu farbu žiarivú a vlasy zdravé čo najdlhšie.',
      content: `<p>Balayage je stále jednou z najžiadanejších techník farbenia. Tu je mojich 5 tipov...</p>`
    },
    {
      id: 3,
      title: 'Tajomstvo perfektne upravenej brady',
      slug: 'tajomstvo-perfektne-upravenej-brady',
      authorId: 'mato',
      publishDate: '2024-07-12',
      imageUrl: 'https://picsum.photos/seed/beardtips/1200/630',
      perex: 'Brada je vizitkou moderného muža. Ako profesionálny barber vám ukážem, že starostlivosť o bradu je rituál, ktorý zahŕňa správne produkty, techniku a pravidelnosť.',
      content: `<p>Starostlivosť o bradu je viac než len zastrihávanie. Poďme sa pozrieť na kľúčové kroky...</p>`
    }
  ]);

  getPosts(): Observable<BlogPostWithAuthor[]> {
    const authors = this.firebaseService.stylists();
    const authorMap = new Map(authors.map(a => [a.id, a]));
    
    const postsWithAuthors = this.posts().map(post => ({
        ...post,
        author: authorMap.get(post.authorId) || this.getUnknownAuthor(post.authorId)
    })).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    return of(postsWithAuthors).pipe(delay(1000));
  }

  getPostBySlug(slug: string): Observable<BlogPostWithAuthor | undefined> {
    const post = this.posts().find(p => p.slug === slug);
    if (!post) {
      return of(undefined).pipe(delay(500));
    }

    const author = this.firebaseService.stylists().find(a => a.id === post.authorId) || this.getUnknownAuthor(post.authorId);
    
    return of({ ...post, author }).pipe(delay(500));
  }
  
  private getUnknownAuthor(id: string): Stylist {
      return { id, name: 'Neznámy autor', title: 'Člen tímu', imageUrl: 'https://picsum.photos/seed/unknown/100/100', services: [] };
  }
}