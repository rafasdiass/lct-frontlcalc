import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  // Propriedades de entrada para controlar as mensagens de feedback
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';

  // Método auxiliar para retornar a classe CSS com base no tipo de mensagem
  getFeedbackClass(): string {
    switch (this.type) {
      case 'success':
        return 'feedback-success';
      case 'error':
        return 'feedback-error';
      default:
        return 'feedback-info';
    }
  }
}
