import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PromptService } from '../services/prompt.service';
import { Prompt } from '../interfaces/prompt';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prompt-list.component.html',
  styleUrls: ['./prompt-list.component.scss']
})
export class PromptListComponent implements OnInit {
  prompts: Prompt[] = [];

  constructor(private promptService: PromptService) {}

  ngOnInit() {
    this.promptService.getPrompts().subscribe({
      next: (prompts) => this.prompts = prompts,
      error: (err) => console.error('Error loading prompts', err)
    });
  }

  getComplexityClass(complexity: number): string {
    if (complexity <= 3) return 'complexity-1-3';
    if (complexity <= 6) return 'complexity-4-6';
    return 'complexity-7-10';
  }
}

