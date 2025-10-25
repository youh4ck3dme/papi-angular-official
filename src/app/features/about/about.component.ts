import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services';

interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  skills: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NgOptimizedImage]
})
export class AboutComponent {
  private seoService = inject(SeoService);

  teamMembers: TeamMember[] = [
    {
      name: 'Papi',
      title: 'Majiteľ & Master Stylist',
      // TODO: Replace with actual, optimized image for production.
      imageUrl: 'https://scontent.fksc1-1.fna.fbcdn.net/v/t51.75761-15/471756944_18482506501022259_3110447749530600604_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8UA8uQQLEcMQ7kNvwFhaGmy&_nc_oc=AdnXJHeil_QavVbhgQMaRmXKlN_0Q1gRDlmRd9aJ9rslGJdnLigIrepXxYZ7uNJRcTI&_nc_zt=23&_nc_ht=scontent.fksc1-1.fna&_nc_gid=GoiXrNPloGt57lVVzG4UxQ&oh=00_AfeYc90vxhgsyoLHAkENv4179TiTY1J25fcPIn4akFTh5w&oe=6903340F', 
      description: 'Zakladateľ salónu s viac ako 15 rokmi skúseností v oblasti vlasového dizajnu. Špecializuje sa na prémiové služby a kreativné transformácie.',
      skills: ['Premium strihanie', 'Styling', 'Farba', 'Kreativné účesy']
    },
    {
      name: 'Maťo',
      title: 'Professional Barber',
      // TODO: Replace with actual, optimized image for production.
      imageUrl: 'https://scontent.fksc1-1.fna.fbcdn.net/v/t39.30808-6/470199320_18481846690022259_180762836107453089_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=X5gQi2RRCzYQ7kNvwFaLA0W&_nc_oc=AdkKdLZOmgVsfPZZOFDGN_zpJS_2yKH7i13kHhAkx7tBTMUWUnYvhfl34BjQsL8FN0s&_nc_zt=23&_nc_ht=scontent.fksc1-1.fna&_nc_gid=OFAcToxHbYiQJHhOoe9IrQ&oh=00_AfdkiJFHZVSxuNGDeJ4ELHUAsVm8Hb9QmlM8LxY0JDsWJA&oe=69034837',
      description: 'Špecialista na pánske strihy a úpravu brady s moderným prístupom. Majster klasických aj moderných techník strihánia.',
      skills: ['Pánske strihanie', 'Brada & fúzy', 'Klasické strihy', 'Fade techniques']
    },
    {
      name: 'Miška',
      title: 'Creative Hair Artist',
      // TODO: Replace with actual, optimized image for production.
      imageUrl: 'https://picsum.photos/seed/miska/400/500',
      description: 'Kreativita a moderné techniky sú jej silnou stránkou. Expertka na farebné transformácie a najnovšie trendy v kaderníctve.',
      skills: ['Dámske strihanie', 'Melír & farba', 'Styling']
    }
  ];

  constructor() {
    this.seoService.updateMetaTags({ 
      description: 'PAPI Hair Design je viac než len kaderníctvo. Prečítajte si náš príbeh odvahy a odhodlania priniesť svetovú kvalitu do Košíc.' 
    });
  }
}