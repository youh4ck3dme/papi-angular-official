import { Injectable, signal, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private notificationService = inject(NotificationService);
  
  // Fix: The signal type is changed to NotificationPermission to correctly handle 'default' state.
  permission = signal<NotificationPermission>('default');

  constructor() {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'notifications' }).then(status => {
        // Fix: Map 'prompt' from Permissions API to 'default' for consistency with Notification API.
        this.permission.set(status.state === 'prompt' ? 'default' : status.state);
        status.onchange = () => {
          this.permission.set(status.state === 'prompt' ? 'default' : status.state);
        };
      });
    }
  }

  async requestPermission() {
    if (!('Notification' in window)) {
      this.notificationService.show('Tento prehliadač nepodporuje notifikácie.', 'error');
      return;
    }

    const permissionResult = await Notification.requestPermission();
    // Fix: The result is directly assignable now.
    this.permission.set(permissionResult);

    if (permissionResult === 'granted') {
      this.notificationService.show('Notifikácie pre pripomienky termínov boli povolené!', 'success');
      // In a real app, you would now get the subscription and send it to your server.
      // this.subscribeUserToPush();
    } else if (permissionResult === 'denied') {
      this.notificationService.show('Notifikácie boli zablokované. Môžete ich povoliť v nastaveniach prehliadača.', 'info');
    }
  }
  
  // Example of how you would subscribe and send to a backend
  // private async subscribeUserToPush() {
  //   const swRegistration = await navigator.serviceWorker.ready;
  //   try {
  //     const subscription = await swRegistration.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // This needs to be generated on your server
  //     });
  //     console.log('User is subscribed:', subscription);
  //     // TODO: Send subscription to your backend to store it.
  //   } catch (error) {
  //     console.error('Failed to subscribe the user: ', error);
  //   }
  // }
}
