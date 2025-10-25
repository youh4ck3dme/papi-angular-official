import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService, BlogPostWithAuthor } from '../../core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NgOptimizedImage]
})
export class BlogListComponent {
  private blogService = inject(BlogService);

  posts = signal<BlogPostWithAuthor[]>([]);
  isLoading = signal(true);

  constructor() {
    this.blogService.getPosts()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(posts => this.posts.set(posts));
  }
}
