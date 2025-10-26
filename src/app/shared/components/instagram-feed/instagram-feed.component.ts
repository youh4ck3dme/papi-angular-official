import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InstagramService, InstagramPost } from '../../../core/services';
import { finalize } from 'rxjs';
import { RevealOnScrollDirective } from '../../directives';

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, RevealOnScrollDirective]
})
export class InstagramFeedComponent {
  private instagramService = inject(InstagramService);

  posts = signal<InstagramPost[]>([]);
  isLoading = signal(true);

  constructor() {
    this.instagramService.getPosts()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(posts => this.posts.set(posts));
  }
}
