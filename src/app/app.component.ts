import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent, NotificationComponent } from './shared/components';
import { SeoService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent]
})
export class AppComponent {
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.init();
  }
}