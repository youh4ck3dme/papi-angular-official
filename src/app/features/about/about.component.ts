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
      imageUrl: 'https://picsum.photos/seed/papi/400/500', 
      description: 'Zakladateľ salónu s viac ako 15 rokmi skúseností v oblasti vlasového dizajnu. Špecializuje sa na prémiové služby a kreativné transformácie.',
      skills: ['Premium strihanie', 'Styling', 'Farba', 'Kreativné účesy']
    },
    {
      name: 'Maťo',
      title: 'Professional Barber',
      // TODO: Replace with actual, optimized image for production.
      imageUrl: 'https://picsum.photos/seed/mato/400/500',
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