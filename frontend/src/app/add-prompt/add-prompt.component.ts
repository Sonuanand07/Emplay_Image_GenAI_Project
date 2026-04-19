import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PromptService } from '../services/prompt.service';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-prompt.component.html',
  styleUrls: ['./add-prompt.component.scss']
})
export class AddPromptComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [5, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.promptService.createPrompt(this.form.value).subscribe({
        next: () => this.router.navigate(['/prompts']),
        error: (err) => console.error('Error creating prompt', err)
      });
    }
  }
}

