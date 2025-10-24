import { Injectable, signal } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  perex: string;
  content: string;
  author: string;
  publishDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly posts = signal<BlogPost[]>([
    {
      id: 1,
      title: 'Môj príbeh v pár slovách – od ulice po svetové pódiá',
      slug: 'moj-pribeh-v-par-slovach',
      author: 'Róbert Papcun',
      publishDate: '2024-07-15',
      perex: 'Volám sa Róbert Papcun a toto je môj príbeh. Cesta od strihania kamarátov v podchodoch až po svetové pódiá, vlastný salón PAPI HAIR DESIGN a rolu ambasádora pre GOLD HAIR CARE.',
      content: `
        <p class="mb-4">Volám sa Róbert Papcun, pochádzam z Košíc a dnes mám 35 rokov. Moja cesta ku kaderníctvu sa začala už v detstve – rád som sledoval, ako strihajú mojich rodičov. Fascinovalo ma, ako sa ľudia menia pred mojimi očami.</p>
        <p class="mb-4">Ako tínedžer som chodil s kamarátmi do salónov, čakal ich a sledoval, ako ich farbia a strihajú. Už vtedy som vedel, že tento svet ma priťahuje. Po večeroch som sa často modlil, aby som bol stále lepší a rástol v tom, čo milujem.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2007 – Prvé nožnice a improvizácia</h2>
        <p class="mb-4">Amatérsky som strihal rodičov a kamarátov – v kočikárni, v blokoch a dokonca aj v podchodoch na uliciach, kde som sa učil improvizovať.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2008 – Stretnutia s ľuďmi z okolia “beauty” sveta</h2>
        <p class="mb-4">Po ukončení školy som sa začal vážne zamýšľať nad tým, že sa stanem kaderníkom a začal som sa viac stretávať s ľuďmi z okolia beauty sveta.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2009 – Prvý kurz a prvé zamestnanie</h2>
        <p class="mb-4">Prihlásil som sa na kadernícky kurz a koncom roka som nastúpil do svojho prvého salónu na sídlisku v Košiciach. Z kurzu som si veľa neodniesol, takže som musel improvizoval. Naučil som sa, že úsmev a dobrá komunikácia sú rovnako dôležité ako nožnice.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2010 – Pánske účesy a barbering</h2>
        <p class="mb-4">Prestúpil som do kvalitnejšieho salónu, kde som sa stal najmladším kaderníkom. Ešte som nevynikal v dámskych službách, preto som sa sústredil na pánske účesy a barbering.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2011 – Taliansko a návrat domov</h2>
        <p class="mb-4">Odišiel som do Talianska, aby som si splnil sen – žiť a pracovať ako kaderník v zahraničí. Nebolo to jednoduché, prácu som nenašiel, ale toto obdobie ma naučilo húževnatosti a samostatnosti. Po 10 mesiacoch som sa vrátil domov, no v hlave som už mal jasný plán – dostať sa do najlepšieho salónu v mojom rodnom meste.</p>
        <p class="mb-4">Prišiel pohovor – a ja som tam vošiel sebavedome, s „talianskym prízvukom“, aby som pôsobil svetovo a zaujímavo. Chcel som ukázať, že som iný. Pamätám si, ako ma šéf posadil k prvému klientovi, aby som ukázal, čo viem. A prijali ma hneď v ten deň. Tento moment zmenil môj život – vedel som, že som na správnej ceste.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2012 – Štúdium po Európe a tvrdá práca v top salóne</h2>
        <p class="mb-4">V tom čase som už pracoval v najprestížnejšom salóne v Košiciach. Nemohol som si len tak strihať a farbiť klientov podľa svojho gusta – každá služba vyžadovala absolvovanie oficiálnych kurzov a školení, ktoré potvrdzovali moju odbornosť.</p>
        <p class="mb-4">Vďaka mojím výsledkom – výkonu v salóne, spokojnosti klientov a silným tržbám – som dostával možnosť cestovať po Európe a zúčastňovať sa školení a workshopov ako odmenu a príležitosť zlepšovať sa. Za niektoré kurzy som si platil aj sám, pretože som vedel, že každá hodina strávená učením ma posúva ďalej.</p>
        <p class="mb-4">V tých rokoch som si uvedomil, že talent nestačí. Ak chceš rásť a byť skutočne dobrý, musíš investovať čas, energiu a často aj vlastné peniaze do seba. Každý deň som pracoval na sebe – strihal, farbil, študoval nové techniky a sledoval trendy, aby som bol pripravený na všetko, čo príde.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2013 – Prvé súťaže</h2>
        <p class="mb-4">V novom salóne som rástol každým mesiacom. Začal som sa zúčastňovať súťaží, získavať prvé ocenenia a veriť si viac než kedykoľvek predtým.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2014 – Módne prehliadky a vlastné show</h2>
        <p class="mb-4">Začal som česať módne prehliadky – od súkromných eventov až po Košice Fashion Week a Praha Fashion Week. Mal som vlastné minúty na pódiu, kde som prezentoval trendy, strihy a farby.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2015 – Sen o vlastnom salóne</h2>
        <p class="mb-4">Mal som veľkú klientelu a začal som snívať o vlastnom priestore. Prestal som míňať, šetril som každý cent a sústredil sa iba na cieľ – otvoriť si raz svoj salón.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2016 – Uznanie a mediálna pozornosť</h2>
        <p class="mb-4">Vyhral som lokálnu súťaž, objavil som sa v magazínoch a v módnych televíziách. Začali ma oslovovať iné salóny z celého Slovenska aj Česka.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2017 – Prípravy na PAPI HAIR DESIGN</h2>
        <p class="mb-4">Rozhodol som sa, že je čas spraviť ďalší krok. Začal som pracovať na svojom sne a pripravovať všetko pre otvorenie vlastného salónu.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2018 – Otvorenie PAPI HAIR DESIGN</h2>
        <p class="mb-4">Otvoril som PAPI HAIR DESIGN bez akejkoľvek finančnej pomoci, iba z nasporených peňazí. Stáva sa z neho miesto, kde sa nielen strihá a farbí, ale aj učí a inšpiruje.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2019 – Rozvoj salónu a lokálne eventy</h2>
        <p class="mb-4">Začínam sa venovať rozvoju salónu a svojho tímu. Chodím česať a strihať na lokálne eventy, festivaly a prehliadky so svojím novým tímom, čím sa stále viac upevňuje reputácia PAPI HAIR DESIGN.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2020 – Ambasádor GOLD HAIR CARE</h2>
        <p class="mb-4">Začala sa nová kapitola môjho života – reprezentujem značku po celom svete, vystupujem na pódiách pred stovkami kaderníkov a tvorím kolekcie, ktoré udávajú trendy.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2021 – Vzdelávanie novej generácie</h2>
        <p class="mb-4">Začínam učiť mladé talenty v bratislavskej akadémii GOLD HAIR CARE a odovzdávam svoje skúsenosti tak, ako kedysi mňa učili moji mentori.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2022 – Prvé veľké pódium v zahraničí</h2>
        <p class="mb-4">Vystupujem na pódiu na Malorke pred stovkami kaderníkov a predvádzam vlastnú show. Je to jeden z mojich najväčších životných momentov – sny sa plnia.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2023 – Nové trendy a prestavba salónu</h2>
        <p class="mb-4">Spolu s tímom GOLD Hair Care tvoríme vlasové trendy a fotíme kolekcie po európskych mestách. Zároveň dávam môjmu salónu nový vizuál a reprezentatívny vzhľad hodný ambasádora značky GOLD Proffesional Haircare.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2024 – Odovzdávanie remesla a ďalšie výzvy</h2>
        <p class="mb-4">Do salónu beriem mladého chalana, ktorý nikdy nedržal nožnice v ruke, a učím ho všetko od nuly. Do roka sa z neho stáva plnohodnotný barber. Sledujem, ako sa môj tím rozrastá, a prijímam ďalšiu veľkú výzvu, neustále rastieme, učíme sa nové techniky a pripravujeme ďalšie veľké projekty.</p>
        <h2 class="text-2xl font-bold text-gold mb-4 mt-8">2025 – Líder, mentor a inšpirácia</h2>
        <p class="mb-4">Dnes vediem silný tím a mám radosť z toho, že viacerí ľudia, ktorí kedysi pracovali ako moji zamestnanci, majú dnes vlastné úspešné salóny. Viem, že ich to inšpirovalo ísť si za svojimi snami, tak ako som si za nimi išiel ja.</p>
        <p class="mb-4">Motivujem mladých ľudí, školím po celom Slovensku a Česku a rodina je môj pevný základ – zdroj energie na nové výzvy.</p>
      `
    }
  ]);

  getPosts(): Observable<BlogPost[]> {
    return of(this.posts()).pipe(delay(200)); // Simulate network latency
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    const post = this.posts().find(p => p.slug === slug);
    return of(post).pipe(delay(200));
  }
}
