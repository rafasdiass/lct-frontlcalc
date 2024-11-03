import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-error-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
})
export class ErrorNotificationComponent {
  @Input() errorMessage: string = '';

  // Verifica se há uma mensagem de erro a ser exibida
  hasError(): boolean {
    return this.errorMessage.trim().length > 0;
  }
}
