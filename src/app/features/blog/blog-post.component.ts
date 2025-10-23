import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../core/services/blog.service';
import { switchMap, finalize, filter, tap } from 'rxjs';
import { SeoService } from '../../core/services/seo.service';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, SafeHtmlPipe]
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  post = signal<BlogPost | null | undefined>(null); // undefined for 'not found' state
  isLoading = signal(true);

  constructor() {
    this.route.paramMap.pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          return [null]; // Should not happen with correct routing
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
        this.seoService.updateMetaTags({ description: post.perex });
      }
    });
  }
}