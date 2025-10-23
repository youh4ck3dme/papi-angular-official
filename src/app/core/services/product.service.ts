import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'PAPI Signature Pomade',
      price: 24.99,
      imageUrl: 'https://picsum.photos/seed/pomade/400/400',
      description: 'Silná fixácia s jemným leskom. Ideálna pre klasické účesy.'
    },
    {
      id: 2,
      name: 'Ocean Salt Spray',
      price: 19.50,
      imageUrl: 'https://picsum.photos/seed/spray/400/400',
      description: 'Dodá vlasom textúru a objem pre dokonalý "plážový" vzhľad.'
    },
    {
      id: 3,
      name: 'Nourishing Beard Oil',
      price: 29.90,
      imageUrl: 'https://picsum.photos/seed/oil/400/400',
      description: 'Vyživujúci olej pre hebkú a zdravú bradu s jemnou vôňou santalového dreva.'
    },
    {
      id: 4,
      name: 'Matte Clay Wax',
      price: 22.00,
      imageUrl: 'https://picsum.photos/seed/wax/400/400',
      description: 'Matný finiš so strednou fixáciou pre prirodzený a moderný styling.'
    }
  ]);

  getProducts(): Observable<Product[]> {
    return of(this.products()).pipe(delay(300)); // Simulate network latency
  }
}
