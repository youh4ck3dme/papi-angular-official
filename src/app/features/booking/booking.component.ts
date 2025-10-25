import { Component, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { FirebaseService, NotificationService, BusinessHoursService, UserService } from '../../core/services';
import { SalonService, Stylist, Appointment } from '../../core/models';
import { finalize } from 'rxjs';

interface TimeSlot {
  start: string;
  end: string;
}

type BookingStep = 'SERVICE' | 'STYLIST' | 'TIME' | 'CONFIRM' | 'SUCCESS' | 'ERROR';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class BookingComponent {
  firebaseService = inject(FirebaseService);
  notificationService = inject(NotificationService);
  businessHoursService = inject(BusinessHoursService);
  userService = inject(UserService);

  // Wizard State
  step = signal<BookingStep>('SERVICE');
  isLoading = signal(false);

  // Selections
  selectedService = signal<SalonService | null>(null);
  selectedStylist = signal<Stylist | null>(null);
  selectedDate = signal<string>(this.getTodayISOString());
  selectedSlot = signal<TimeSlot | null>(null);
  
  // Data from Backend
  services = toSignal(this.firebaseService.getServices(), { initialValue: [] });
  availableStylists = signal<Stylist[]>([]);
  availableSlots = signal<TimeSlot[]>([]);
  
  // UI Helpers
  minDate = computed(() => this.getTodayISOString());
  steps = [
    { key: 'SERVICE', label: 'Služba' },
    { key: 'STYLIST', label: 'Stylista' },
    { key: 'TIME', label: 'Termín' }
  ];

  private getTodayISOString(): string {
      const today = new Date();
      return today.toISOString().split('T')[0];
  }

  // --- Step 1: Select Service ---
  selectService(service: SalonService) {
    this.selectedService.set(service);
    this.isLoading.set(true);
    this.firebaseService.getStylistsForService(service.id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(stylists => {
        this.availableStylists.set(stylists);
        this.step.set('STYLIST');
      });
  }

  // --- Step 2: Select Stylist ---
  selectStylist(stylist: Stylist) {
    this.selectedStylist.set(stylist);
    this.step.set('TIME');
    this.fetchAvailableSlots();
  }

  // --- Step 3: Select Time ---
  onDateChange() {
    this.availableSlots.set([]);
    this.selectedSlot.set(null);
    this.fetchAvailableSlots();
  }

  fetchAvailableSlots() {
    if (!this.selectedStylist()) return;
    this.isLoading.set(true);
    this.availableSlots.set([]);

    const date = new Date(this.selectedDate());
    const dayIndex = date.getDay();
    const todayHours = this.businessHoursService.openingHours().find(h => h.dayIndex === dayIndex);

    if (!todayHours || todayHours.open === 'ZAVRETÉ') {
      this.isLoading.set(false);
      return;
    }

    const timeMin = new Date(date);
    const [openHour, openMinute] = todayHours.open.split(':').map(Number);
    timeMin.setHours(openHour, openMinute, 0, 0);

    const timeMax = new Date(date);
    const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
    timeMax.setHours(closeHour, closeMinute, 0, 0);

    this.firebaseService.getStylistAppointments(this.selectedStylist()!.id, date)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (appointments) => {
          const busyTimes = appointments.map(a => ({ start: a.startTime.toISOString(), end: a.endTime.toISOString() }));
          this.generateSlots(timeMin, timeMax, busyTimes);
        },
        error: (err) => {
          console.error('Error fetching appointments:', err);
          this.notificationService.show('Nepodarilo sa načítať voľné termíny.', 'error');
        }
      });
  }
  
  private generateSlots(openTime: Date, closeTime: Date, busyTimes: { start: string, end: string }[]) {
    const slots: TimeSlot[] = [];
    if (!this.selectedService()) return;
    
    const serviceDuration = this.selectedService()!.duration;
    const slotIncrement = 15;

    let currentTime = new Date(openTime);

    while (currentTime.getTime() + serviceDuration * 60000 <= closeTime.getTime()) {
      const slotEndTime = new Date(currentTime.getTime() + serviceDuration * 60000);

      const isBusy = busyTimes.some(busy => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return (currentTime < busyEnd && slotEndTime > busyStart);
      });

      if (!isBusy) {
        slots.push({
          start: `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`,
          end: `${slotEndTime.getHours().toString().padStart(2, '0')}:${slotEndTime.getMinutes().toString().padStart(2, '0')}`
        });
      }
      
      currentTime = new Date(currentTime.getTime() + slotIncrement * 60000);
    }
    this.availableSlots.set(slots);
  }

  selectSlot(slot: TimeSlot) {
    this.selectedSlot.set(slot);
    this.step.set('CONFIRM');
  }
  
  // --- Step 4: Confirmation ---
  confirmBooking() {
    const slot = this.selectedSlot();
    const service = this.selectedService();
    const stylist = this.selectedStylist();
    const user = this.userService.currentUser();

    if (!slot || !service || !stylist || !user) {
        this.notificationService.show('Chýbajú údaje pre rezerváciu.', 'error');
        return;
    }
    
    this.isLoading.set(true);
    
    const startTime = new Date(this.selectedDate());
    const [startHour, startMinute] = slot.start.split(':').map(Number);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(startTime.getTime() + service.duration * 60000);
    
    const newAppointment: Omit<Appointment, 'id'> = {
        userId: user.uid,
        stylistId: stylist.id,
        serviceId: service.id,
        startTime,
        endTime,
        status: 'upcoming'
    };
    
    this.firebaseService.createAppointment(newAppointment)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
          next: () => {
              this.step.set('SUCCESS');
          },
          error: (err) => {
              console.error('Booking error:', err);
              this.notificationService.show('Rezervácia zlyhala. Skúste to prosím znova.', 'error');
              this.step.set('TIME');
          }
      });
  }

  // --- Navigation ---
  changeStep(targetStep: BookingStep) {
    if (targetStep === 'SERVICE') {
      this.selectedService.set(null);
      this.selectedStylist.set(null);
      this.selectedSlot.set(null);
    }
    if (targetStep === 'STYLIST') {
      this.selectedStylist.set(null);
      this.selectedSlot.set(null);
    }
    this.step.set(targetStep);
  }

  startNewBooking() {
    this.selectedService.set(null);
    this.selectedStylist.set(null);
    this.selectedSlot.set(null);
    this.selectedDate.set(this.getTodayISOString());
    this.step.set('SERVICE');
  }
}
