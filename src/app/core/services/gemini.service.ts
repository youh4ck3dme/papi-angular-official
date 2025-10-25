import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { from, Observable } from 'rxjs';

/**
 * Service for interacting with the Google Gemini API.
 * This service handles model initialization and content generation.
 * API key is loaded from process.env.API_KEY as per guidelines.
 */
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  // Recommended model for general text tasks as per guidelines.
  private readonly MODEL_NAME = 'gemini-2.5-flash'; 

  constructor() {
    // Initialize GoogleGenAI with the API key from environment variables.
    // The API key is assumed to be pre-configured, valid, and accessible.
    // Do NOT prompt the user for the API key.
    if (!process.env.API_KEY) {
      console.error('Gemini API Key is not set in environment variables.');
      // In a real application, you might want more robust error handling or UI feedback.
      throw new Error('Gemini API Key is missing. Please ensure process.env.API_KEY is configured.');
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Generates text content using the Gemini model.
   * @param prompt The text prompt to send to the model.
   * @returns An Observable of the generated text content.
   */
  generateText(prompt: string): Observable<string> {
    // Wrap the async API call in an Observable for Angular's reactive programming paradigm.
    return from(this.ai.models.generateContent({
      model: this.MODEL_NAME,
      contents: prompt,
      // Omit thinkingConfig entirely for most tasks; this defaults to enabling thinking for higher quality.
      // If a very low latency response is critical (e.g., game AI), thinkingBudget could be set to 0.
    }).then((response: GenerateContentResponse) => {
      // Extract the generated text content directly from the 'text' property of the response.
      return response.text;
    }).catch((error) => {
      console.error('Error generating content from Gemini API:', error);
      // Propagate the error through the Observable for downstream error handling.
      throw error;
    }));
  }

  /**
   * Generates text content from a multimodal prompt (text and image).
   * @param prompt The text prompt.
   * @param base64Image The base64-encoded image data, without the 'data:mime/type;base64,' prefix.
   * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
   * @returns An Observable of the generated text content.
   */
  generateMultimodalText(prompt: string, base64Image: string, mimeType: string): Observable<string> {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };
    const textPart = { text: prompt };
    
    return from(this.ai.models.generateContent({
      model: this.MODEL_NAME,
      contents: { parts: [textPart, imagePart] },
    }).then((response: GenerateContentResponse) => {
      // The .text property provides the direct string output
      return response.text;
    }).catch((error) => {
      console.error('Error generating multimodal content from Gemini API:', error);
      throw new Error('Failed to get a response from the AI. Please try again.');
    }));
  }
}