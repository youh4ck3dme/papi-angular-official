import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BusinessHoursService } from '../../../core/services/business-hours.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class FooterComponent {
  businessHoursService = inject(BusinessHoursService);
  
  openingHours = this.businessHoursService.openingHours;
  currentStatus = this.businessHoursService.currentStatus;
  todayIndex = this.businessHoursService.todayIndex;

  currentYear = new Date().getFullYear();
  
  socialLinks = {
    instagram: 'https://www.instagram.com/papi_hair_design/',
    facebook: 'https://www.facebook.com/papihairdesign/',
    tiktok: 'https://www.tiktok.com/discover/papi-haircut'
  };
}