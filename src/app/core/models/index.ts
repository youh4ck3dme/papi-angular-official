export interface PrivacyConsent {
  camera: boolean;
  analytics: boolean;
  personalData: boolean;
  marketing: boolean;
  lastUpdated: Date;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  picture: string;
  loyaltyPoints: number;
  privacyConsent: PrivacyConsent;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  services: string[]; // array of service IDs
}

export interface SalonService {
  id: string;
  name:string;
  duration: number; // in minutes
  price: number;
  category: 'Dámske' | 'Pánske' | 'Farbenie' | 'Ostatné';
}

export interface Appointment {
  id: string;
  userId: string;
  stylistId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'completed' | 'upcoming' | 'cancelled';
}