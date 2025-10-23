import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GeminiService } from '../../core/services/gemini.service';
import { finalize } from 'rxjs';

interface StylePrompt {
  name: string;
  prompt: string;
  thumbnail: string;
}

@Component({
  selector: 'app-vto',
  templateUrl: './vto.component.html',
  styleUrls: ['./vto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage]
})
export class VtoComponent {
  private geminiService = inject(GeminiService);

  uploadedImage = signal<string | null>(null);
  uploadedImageType = signal<string | null>(null);
  generatedImage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  selectedStyle = signal<StylePrompt | null>(null);

  stylePrompts: StylePrompt[] = [
    { name: 'Platinum Bob', prompt: 'a sharp, platinum blonde bob haircut', thumbnail: 'https://picsum.photos/id/1027/200/200' },
    { name: 'Fiery Red Waves', prompt: 'long, wavy hair in a vibrant fiery red color', thumbnail: 'https://picsum.photos/id/1074/200/200' },
    { name: 'Pastel Pixie', prompt: 'a short pixie cut with pastel pink and lavender highlights', thumbnail: 'https://picsum.photos/id/103/200/200' },
    { name: 'Ocean Blue Curls', prompt: 'curly shoulder-length hair in a deep ocean blue color', thumbnail: 'https://picsum.photos/id/433/200/200' }
  ];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedImageType.set(file.type);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage.set(e.target.result);
        this.generatedImage.set(null); // Reset generated image on new upload
        this.error.set(null);
      };
      reader.readAsDataURL(file);
    }
  }
  
  selectStyle(style: StylePrompt): void {
    this.selectedStyle.set(style);
  }

  generateHairstyle(): void {
    const image = this.uploadedImage();
    const imageType = this.uploadedImageType();
    const style = this.selectedStyle();

    if (!image || !style || !imageType) {
      this.error.set('Please upload an image and select a style.');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.generatedImage.set(null);

    const base64Image = image.split(',')[1];
    
    this.geminiService.generateHairstyle(style.prompt, base64Image, imageType)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (resultImageUrl) => {
          this.generatedImage.set(resultImageUrl);
        },
        error: (err: Error) => {
          this.error.set(err.message || 'An unexpected error occurred.');
        }
      });
  }
}