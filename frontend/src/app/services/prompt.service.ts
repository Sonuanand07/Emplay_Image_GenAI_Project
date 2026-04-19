import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prompt, CreatePrompt } from '../interfaces/prompt';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
private apiUrl = 'https://emplay-image-genai-project.onrender.com/prompts/';

  constructor(private http: HttpClient) {}

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<{prompts: Prompt[]}>(this.apiUrl).pipe(
      map(data => data.prompts)
    );
  }

  getPrompt(id: number): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiUrl}${id}/`);
  }

  createPrompt(prompt: CreatePrompt): Observable<any> {
    return this.http.post(this.apiUrl, prompt);
  }
}

