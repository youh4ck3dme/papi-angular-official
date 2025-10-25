import { Component, ChangeDetectionStrategy, inject, signal, OnInit, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, FirebaseService, NotificationService } from '../../core/services';
import { PrivacyConsent } from '../../core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class PrivacyComponent implements OnInit {
  private fb = inject(FormBuilder);
  userService = inject(UserService);
  private firebaseService = inject(FirebaseService);
  private notificationService = inject(NotificationService);

  currentUser = this.userService.currentUser;
  privacyForm!: FormGroup;
  isSaving = signal(false);

  constructor() {
    effect(() => {
      const user = this.currentUser();
      if (user && this.privacyForm) {
        this.privacyForm.patchValue(user.privacyConsent);
      }
    });
  }

  ngOnInit() {
    this.privacyForm = this.fb.group({
      camera: [false],
      analytics: [false],
      personalData: [{ value: true, disabled: true }], // Always required for service usage
      marketing: [false]
    });

    const user = this.currentUser();
    if (user) {
      this.privacyForm.patchValue(user.privacyConsent);
    }
  }

  savePreferences() {
    if (this.privacyForm.invalid || !this.currentUser()) return;
    
    this.isSaving.set(true);
    const formValue = this.privacyForm.getRawValue(); // Use getRawValue to include disabled controls
    const consentData: Omit<PrivacyConsent, 'lastUpdated'> = {
      camera: formValue.camera,
      analytics: formValue.analytics,
      personalData: formValue.personalData,
      marketing: formValue.marketing
    };

    this.firebaseService.updatePrivacyConsent(this.currentUser()!.uid, consentData)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe(() => {
        // Optimistically update the local user signal
        this.userService.currentUser.update(user => {
          if (!user) return null;
          return {
            ...user,
            privacyConsent: {
              ...consentData,
              lastUpdated: new Date()
            }
          };
        });
        this.notificationService.show('Vaše nastavenia súkromia boli uložené.', 'success');
        this.privacyForm.markAsPristine();
      });
  }
}
