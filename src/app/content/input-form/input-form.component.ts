import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldsComponent } from './input-fields/input-fields.component';
import { CalculationData } from '../../shared/models/calculation-data.model';
import { ApiService } from '../../shared/api.service';
import { NotificationService } from '../../shared/notification.service';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [CommonModule, InputFieldsComponent, SubmitButtonComponent],
  standalone: true,
})
export class InputFormComponent {
  isSubmitting: boolean = false;
  formData: CalculationData | null = null; // Armazena os dados do formulário

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  /**
   * Recebe os dados do formulário e armazena na propriedade formData.
   * @param data Dados do formulário de entrada.
   */
  onFormDataReceived(data: CalculationData): void {
    this.formData = data;
  }

  /**
   * Método chamado ao clicar no botão de envio.
   * Verifica se há dados no formulário antes de enviar.
   */
  onButtonClicked(): void {
    if (this.formData) {
      this.onFormSubmit(this.formData);
    } else {
      this.notificationService.showWarning('Por favor, preencha o formulário.');
      console.error('Nenhum dado recebido para envio.');
    }
  }

  /**
   * Envia os dados do formulário para o backend.
   * @param data Dados de cálculo a serem enviados.
   */
  onFormSubmit(data: CalculationData): void {
    this.isSubmitting = true;
    this.apiService.sendCalculationData(data).subscribe({
      next: (response: Record<string, any>): void => {
        this.isSubmitting = false;
        this.notificationService.showSuccess('Dados enviados com sucesso!');
        console.log('Resposta:', response);
      },
      error: (err: Error): void => {
        this.isSubmitting = false;
        this.notificationService.showError('Erro ao enviar os dados.');
        console.error('Erro:', err);
      },
    });
  }
}
