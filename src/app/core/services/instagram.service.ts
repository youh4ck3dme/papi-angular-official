import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private readonly mockPosts: InstagramPost[] = [
    { id: '1', imageUrl: 'https://picsum.photos/seed/insta1/500/500', caption: 'Svieži letný zostrih! ☀️', permalink: 'https://www.instagram.com/papi_hair_design/' },
    { id: '2', imageUrl: 'https://picsum.photos/seed/insta2/500/500', caption: 'Dokonalá balayage v našom salóne.', permalink: 'https://www.instagram.com/papi_hair_design/' },
    { id: '3', imageUrl: 'https://picsum.photos/seed/insta3/500/500', caption: 'Precízny pánsky strih od Maťa.', permalink: 'https://www.instagram.com/papi_hair_design/' },
    { id: '4', imageUrl: 'https://picsum.photos/seed/insta4/500/500', caption: 'Pripravená na plesovú sezónu.', permalink: 'https://www.instagram.com/papi_hair_design/' },
    { id: '5', imageUrl: 'https://picsum.photos/seed/insta5/500/500', caption: 'Odvážna farebná premena. 💜', permalink: 'https://www.instagram.com/papi_hair_design/' },
    { id: '6', imageUrl: 'https://picsum.photos/seed/insta6/500/500', caption: 'Detail robí majstra. #barberlife', permalink: 'https://www.instagram.com/papi_hair_design/' },
  ];

  getPosts(): Observable<InstagramPost[]> {
    return of(this.mockPosts).pipe(delay(1500)); // Simulate network latency
  }
}
