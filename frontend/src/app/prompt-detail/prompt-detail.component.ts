import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PromptService } from '../services/prompt.service';
import { Prompt } from '../interfaces/prompt';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-detail.component.html',
  styleUrls: ['./prompt-detail.component.scss']
})
export class PromptDetailComponent implements OnInit {
  prompt: Prompt | null = null;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.promptService.getPrompt(id).subscribe({
      next: (prompt) => this.prompt = prompt,
      error: (err) => console.error('Error loading prompt', err)
    });
  }
}

