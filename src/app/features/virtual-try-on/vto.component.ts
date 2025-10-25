import { Component, ChangeDetectionStrategy, inject, signal, OnDestroy, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { GeminiService, NotificationService, UserService } from '../../core/services';
import { SafeHtmlPipe } from '../../shared/pipes';

type VtoState = 'initial' | 'camera' | 'preview' | 'loading' | 'result';

@Component({
  selector: 'app-vto',
  templateUrl: './vto.component.html',
  styleUrls: ['./vto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, NgOptimizedImage, SafeHtmlPipe]
})
export class VtoComponent implements OnDestroy {
  private geminiService = inject(GeminiService);
  private notificationService = inject(NotificationService);
  userService = inject(UserService);

  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement?: ElementRef<HTMLCanvasElement>;

  state = signal<VtoState>('initial');
  stream = signal<MediaStream | null>(null);
  capturedImage = signal<string | null>(null);
  prompt = signal<string>('');
  generatedSuggestion = signal<string>('');
  
  inspirationPrompts = signal<string[]>([
    'a vibrant, fiery red color',
    'long, flowing bohemian waves',
    'a sharp, platinum blonde bob',
    'an edgy, dark undercut',
    'soft, pastel pink highlights'
  ]);

  // Computed property to disable the generate button
  isGenerateDisabled = computed(() => !this.capturedImage() || !this.prompt().trim() || this.state() === 'loading');

  ngOnDestroy() {
    this.stopCamera();
  }

  async startCamera() {
    this.resetToInitial();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } });
        this.stream.set(stream);
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
        this.state.set('camera');
      } catch (err) {
        this.notificationService.show('Prístup ku kamere bol zamietnutý. Povoľte ho prosím v nastaveniach prehliadača.', 'error');
        console.error("Error accessing camera: ", err);
      }
    } else {
       this.notificationService.show('Váš prehliadač nepodporuje prístup ku kamere.', 'error');
    }
  }

  stopCamera() {
    this.stream()?.getTracks().forEach(track => track.stop());
    this.stream.set(null);
  }

  captureImage() {
    if (this.videoElement && this.canvasElement) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        this.capturedImage.set(dataUrl);
        this.state.set('preview');
        this.stopCamera();
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.capturedImage.set(e.target?.result as string);
          this.state.set('preview');
        };
        reader.readAsDataURL(file);
      } else {
        this.notificationService.show('Prosím, nahrajte platný obrázkový súbor.', 'error');
      }
    }
  }

  setPrompt(inspiration: string) {
    this.prompt.set(inspiration);
  }

  generateSuggestion() {
    const imageDataUrl = this.capturedImage();
    const userPrompt = this.prompt().trim();
    if (!imageDataUrl || !userPrompt) return;

    this.state.set('loading');
    
    // Extract base64 data and mime type from data URL
    const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) {
        this.notificationService.show('Neplatný formát obrázka.', 'error');
        this.state.set('preview');
        return;
    }
    const mimeType = match[1];
    const base64Image = match[2];

    const fullPrompt = `You are a world-class hair stylist. Based on the person in this image, describe in a positive and encouraging tone how they would look with ${userPrompt}. Be descriptive about how it would frame their face and complement their features. Provide the description in a single paragraph, formatted with HTML <p> tags.`;

    this.geminiService.generateMultimodalText(fullPrompt, base64Image, mimeType)
      .pipe(finalize(() => this.state.set('result')))
      .subscribe({
        next: (suggestion) => {
          this.generatedSuggestion.set(suggestion);
        },
        error: (err) => {
          this.notificationService.show(err.message || 'Nepodarilo sa vygenerovať návrh.', 'error');
          this.state.set('preview');
        }
      });
  }

  resetToInitial() {
    this.stopCamera();
    this.capturedImage.set(null);
    this.generatedSuggestion.set('');
    this.prompt.set('');
    this.state.set('initial');
  }
}