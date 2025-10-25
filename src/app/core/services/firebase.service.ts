import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Appointment, PrivacyConsent, SalonService, Stylist, UserProfile } from '../models';

// MOCK DATA
const STYLISTS: Stylist[] = [
  { id: 'papi', name: 'Papi', title: 'Majiteľ & Master Stylist', imageUrl: 'https://picsum.photos/seed/papi/400/500', services: ['ds', 'ps', 'fo', 'b_komplet', 'b_dorabka', 'm_komplet', 'ss'] },
  { id: 'mato', name: 'Maťo', title: 'Professional Barber', imageUrl: 'https://picsum.photos/seed/mato/400/500', services: ['ps', 'ub'] },
  { id: 'miska', name: 'Miška', title: 'Creative Hair Artist', imageUrl: 'https://picsum.photos/seed/miska/400/500', services: ['ds', 'fo', 'b_komplet', 'm_komplet', 'ss'] },
];

const SERVICES: SalonService[] = [
  { id: 'ds', name: 'Dámsky strih', duration: 60, price: 30, category: 'Dámske' },
  { id: 'fo', name: 'Fúkaná', duration: 45, price: 25, category: 'Dámske' },
  { id: 'ss', name: 'Spoločenský účes', duration: 75, price: 40, category: 'Dámske' },
  { id: 'b_komplet', name: 'Balayage komplet', duration: 180, price: 150, category: 'Farbenie' },
  { id: 'b_dorabka', name: 'Balayage dorábka', duration: 150, price: 120, category: 'Farbenie' },
  { id: 'm_komplet', name: 'Melír komplet', duration: 180, price: 150, category: 'Farbenie' },
  { id: 'ps', name: 'Pánsky strih', duration: 45, price: 19, category: 'Pánske' },
  { id: 'ub', name: 'Úprava brady', duration: 30, price: 12, category: 'Pánske' },
];

/**
 * A service to simulate interactions with a Firestore backend.
 * It manages collections for stylists, services, appointments, and users.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  // Simulate collections in Firestore
  private readonly _stylists = signal<Stylist[]>(STYLISTS);
  private readonly _services = signal<SalonService[]>(SERVICES);
  private readonly _users = signal<UserProfile[]>([]);
  private readonly _appointments = signal<Appointment[]>([]);

  // Public signals for readonly access
  public readonly stylists = this._stylists.asReadonly();
  public readonly services = this._services.asReadonly();

  constructor() {
    // Initialize with some mock data for development
    this.seedMockData();
  }

  private seedMockData() {
    // Seed user
    const mockUser: UserProfile = {
      uid: 'mock-user-123',
      name: 'Test User',
      email: 'test@example.com',
      loyaltyPoints: 1250,
      picture: 'https://picsum.photos/seed/testuser/100/100',
      privacyConsent: {
        camera: false,
        analytics: true,
        personalData: true,
        marketing: false,
        lastUpdated: new Date()
      }
    };
    this._users.set([mockUser]);

    // Seed appointments
    const now = new Date();
    const mockAppointments: Appointment[] = [
      {
        id: 'appt-1',
        userId: 'mock-user-123',
        stylistId: 'papi',
        serviceId: 'ps',
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14, 10, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14, 10, 45),
        status: 'completed'
      },
      {
        id: 'appt-2',
        userId: 'mock-user-123',
        stylistId: 'miska',
        serviceId: 'ds',
        startTime: new Date(now.getFullYear(), now.getMonth() - 1, 15, 14, 0),
        endTime: new Date(now.getFullYear(), now.getMonth() - 1, 15, 15, 0),
        status: 'completed'
      },
      {
        id: 'appt-3',
        userId: 'mock-user-123',
        stylistId: 'papi',
        serviceId: 'ps',
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 16, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 16, 45),
        status: 'upcoming'
      }
    ];
    this._appointments.set(mockAppointments);
  }

  // --- API Methods ---

  getServices(): Observable<SalonService[]> {
    return of(this.services()).pipe(delay(200)); // Simulate latency
  }

  getStylistsForService(serviceId: string): Observable<Stylist[]> {
    const stylists = this.stylists().filter(s => s.services.includes(serviceId));
    return of(stylists).pipe(delay(300));
  }

  getStylistAppointments(stylistId: string, date: Date): Observable<Appointment[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const appointments = this._appointments().filter(a => 
      a.stylistId === stylistId &&
      a.startTime >= startOfDay &&
      a.startTime <= endOfDay
    );
    return of(appointments).pipe(delay(500));
  }

  getUserProfile(uid: string): Observable<UserProfile | null> {
    const user = this._users().find(u => u.uid === uid) || null;
    return of(user).pipe(delay(200));
  }

  createUserProfile(profile: UserProfile): Observable<UserProfile> {
    this._users.update(users => [...users, profile]);
    return of(profile).pipe(delay(300));
  }
  
  getUserAppointments(userId: string): Observable<Appointment[]> {
    const appointments = this._appointments()
      .filter(a => a.userId === userId)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime()); // Newest first
    return of(appointments).pipe(delay(400));
  }

  createAppointment(appointmentData: Omit<Appointment, 'id'>): Observable<Appointment> {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `appt-${Math.random().toString(36).substr(2, 9)}`,
    };
    this._appointments.update(appts => [...appts, newAppointment]);
    // Also update user loyalty points
    this._users.update(users => users.map(u => u.uid === newAppointment.userId ? { ...u, loyaltyPoints: u.loyaltyPoints + 100 } : u));
    return of(newAppointment).pipe(delay(1000));
  }

  updatePrivacyConsent(userId: string, consent: Omit<PrivacyConsent, 'lastUpdated'>): Observable<void> {
    this._users.update(users => users.map(u => {
      if (u.uid === userId) {
        return { 
          ...u, 
          privacyConsent: {
            ...consent,
            lastUpdated: new Date()
          } 
        };
      }
      return u;
    }));
    return of(undefined).pipe(delay(500)); // Simulate async update
  }
}