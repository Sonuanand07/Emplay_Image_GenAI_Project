import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  template: `
    <nav class="container">
      <a routerLink="/prompts" routerLinkActive="active">Prompts</a> |
      <a routerLink="/add-prompt" routerLinkActive="active">Add Prompt</a>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prompt-library';
}

