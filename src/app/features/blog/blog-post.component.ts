import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPostWithAuthor, SeoService } from '../../core/services';
import { switchMap, finalize, tap } from 'rxjs';
import { SafeHtmlPipe } from '../../shared/pipes';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, NgOptimizedImage]
})
export class BlogPostComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  post = signal<BlogPostWithAuthor | undefined>(undefined);
  isLoading = signal(true);

  constructor() {
    this.route.paramMap.pipe(
      tap(() => {
        this.post.set(undefined);
        this.isLoading.set(true);
      }),
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          return [undefined];
        }
        return this.blogService.getPostBySlug(slug);
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe(post => {
      this.post.set(post);
    });

    effect(() => {
      const post = this.post();
      if (post) {
        this.seoService.updateTitle(`Blog | ${post.title}`);
        this.seoService.updateMetaTags({ description: post.perex, image: post.imageUrl });
      } else if (!this.isLoading()) {
        this.seoService.updateTitle('Blog | Príspevok nenájdený');
        this.seoService.updateMetaTags({ description: 'Tento blogový príspevok nebol nájdený.' });
      }
    });
  }
}
