import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { UserService, FirebaseService, PushNotificationService } from '../../core/services';
import { Appointment, UserProfile } from '../../core/models';
import { switchMap, map, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

interface AppointmentDetails extends Appointment {
  serviceName: string;
  stylistName: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, DatePipe, RouterLink]
})
export class ProfileComponent {
  userService = inject(UserService);
  firebaseService = inject(FirebaseService);
  pushService = inject(PushNotificationService);

  currentUser = this.userService.currentUser;
  
  // Use a reactive stream that refetches appointments if the user changes.
  // This stream also maps service and stylist names for performance, avoiding calls in template loops.
  appointments = toSignal(
    toObservable(this.currentUser).pipe(
      filter((user): user is UserProfile => user !== null), // Proceed only when user is logged in
      switchMap(user => 
        combineLatest({
          appts: this.firebaseService.getUserAppointments(user.uid),
          services: this.firebaseService.getServices(),
          stylists: toObservable(this.firebaseService.stylists) // Signal to Observable
        })
      ),
      map(({ appts, services, stylists }) => {
        if (appts.length === 0) {
          return [];
        }
        const serviceMap = new Map(services.map(s => [s.id, s.name]));
        const stylistMap = new Map(stylists.map(s => [s.id, s.name]));
        
        return appts.map(appt => ({
          ...appt,
          serviceName: serviceMap.get(appt.serviceId) ?? 'Neznáma služba',
          stylistName: stylistMap.get(appt.stylistId) ?? 'Neznámy stylista'
        }));
      })
    ),
    { initialValue: [] as AppointmentDetails[] }
  );
  
  requestNotifications() {
    this.pushService.requestPermission();
  }
}
