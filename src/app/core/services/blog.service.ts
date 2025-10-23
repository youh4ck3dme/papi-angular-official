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
      author: 'PAPI',
      publishDate: '2024-07-15',
      perex: 'Cesta za snom nie je nikdy priama. Prečítajte si, ako som sa dostal od prvých strihov v garáži až po prácu s celebritami a uznanie na medzinárodnej scéne.',
      content: `
        <h2 class="text-2xl font-bold text-gold mb-4">Začiatky: Vášeň a nožnice</h2>
        <p class="mb-4">Všetko to začalo v malom meste, kde jedinou mojou ambíciou bolo robiť ľuďom radosť. S nožnicami, ktoré som dostal od starého otca, som trénoval na každom, kto mi to dovolil. Neboli to žiadne luxusné salóny, len stará garáž a veľa odhodlania. Každý strih bol pre mňa lekciou, každá chyba motiváciou.</p>
        <h2 class="text-2xl font-bold text-gold mb-4">Bod zlomu: Cesta do sveta</h2>
        <p class="mb-4">Vedel som, že ak chcem rásť, musím opustiť svoju komfortnú zónu. Zbalil som si kufre a vybral sa do Londýna, mekky vlasového dizajnu. Boli to ťažké časy, plné práce a učenia. Ale práve tam, v konkurencii najlepších, som našiel svoj vlastný štýl – spojenie precíznej techniky a umeleckej intuície.</p>
        <h2 class="text-2xl font-bold text-gold mb-4">Súčasnosť: PAPI Hair Design</h2>
        <p>Po rokoch v zahraničí, práci pre módne prehliadky a celebrity, som sa rozhodol vrátiť domov a priniesť kúsok veľkého sveta sem. PAPI Hair Design nie je len salón. Je to miesto, kde sa stretáva remeslo, umenie a komunita. Je to splnenie môjho sna a ja som vďačný, že ho môžem zdieľať s vami.</p>
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
