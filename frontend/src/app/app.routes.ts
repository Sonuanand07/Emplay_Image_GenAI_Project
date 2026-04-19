import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/prompts', pathMatch: 'full' },
  { path: 'prompts', loadComponent: () => import('./prompt-list/prompt-list.component').then(m => m.PromptListComponent) },
  { path: 'prompts/:id', loadComponent: () => import('./prompt-detail/prompt-detail.component').then(m => m.PromptDetailComponent) },
  { path: 'add-prompt', loadComponent: () => import('./add-prompt/add-prompt.component').then(m => m.AddPromptComponent) },
];

