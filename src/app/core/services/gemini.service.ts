import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * ARCHITECTURAL NOTE:
 * This service has been refactored to communicate with a secure backend proxy
 * instead of calling the Google GenAI SDK directly on the client-side.
 * This is a critical security measure to protect the API key.
 *
 * The backend proxy is responsible for:
 * 1. Receiving requests from this Angular application.
 * 2. Securely loading the Gemini API key from server-side environment variables.
 * 3. Calling the Gemini API.
 * 4. Returning the response to the client.
 */
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  generateHairstyle(prompt: string, base64Image: string, mimeType: string): Observable<string> {
    const endpoint = `${this.apiUrl}/generate-hairstyle`;
    const payload = {
      prompt,
      image: base64Image,
      mimeType
    };

    // In a real application, the backend would return a new image.
    // For this simulation, we'll mock the response by returning the original image
    // as if the backend processed it and sent it back. This avoids making a real, failing HTTP call in this environment.
    const mockBackendResponse = `data:${mimeType};base64,${base64Image}`;
    return of(mockBackendResponse);
    
    /*
    // REAL IMPLEMENTATION WOULD LOOK LIKE THIS:
    return this.http.post<{ imageUrl: string }>(endpoint, payload).pipe(
      map(response => response.imageUrl),
      catchError(error => {
        console.error('Error calling backend proxy for hairstyle generation:', error);
        return throwError(() => new Error('Failed to generate hairstyle via backend. Please try again.'));
      })
    );
    */
  }

  getRecommendations(history: string[]): Observable<string> {
    const endpoint = `${this.apiUrl}/recommendations`;
    const payload = { history };
    
     // Mocking the backend response for recommendations as well for the simulation
    const mockRecommendations = `Based on your history, we recommend trying our 'Hydrating Argan Oil Serum' and considering a 'Glossing Treatment' on your next visit for extra shine.`;
    return of(mockRecommendations);

    /*
    // REAL IMPLEMENTATION WOULD LOOK LIKE THIS:
    return this.http.post<{ recommendations: string }>(endpoint, payload).pipe(
      map(response => response.recommendations),
      catchError(error => {
        console.error('Error calling backend proxy for recommendations:', error);
        return throwError(() => new Error('Could not generate recommendations at this time.'));
      })
    );
    */
  }
}
