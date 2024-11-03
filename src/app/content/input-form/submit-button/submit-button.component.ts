import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalculationRequest } from '../../../shared/models/calculation-data.model';
import { ApiService } from '../../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  standalone: true,
  imports: [],
})
export class SubmitButtonComponent {
  @Input() calculationData: { [key: string]: string | number } = {};
  @Input() selectedType: string | null = null;
  @Input() selectedSubType: string | null = null;
  @Input() isLoading: boolean = false; // Adicionado para receber o valor de isLoading
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() feedbackMessage = new EventEmitter<{
    message: string;
    type: 'success' | 'error' | 'info';
  }>();

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    if (!this.selectedType) {
      this.feedbackMessage.emit({
        message: 'Selecione um tipo de cálculo antes de enviar.',
        type: 'error',
      });
      return;
    }

    this.isLoading = true;

    const requestData: CalculationRequest = {
      tipo: this.selectedType,
      subtipo: this.selectedSubType || undefined,
      parametros: this.calculationData,
    };

    this.apiService.sendCalculationData(requestData).subscribe(
      () => {
        this.isLoading = false;
        this.feedbackMessage.emit({
          message: 'Formulário enviado com sucesso!',
          type: 'success',
        });
        this.formSubmitted.emit();
        this.router.navigate(['/results']);
      },
      (error) => {
        this.isLoading = false;
        this.feedbackMessage.emit({
          message: 'Erro ao enviar formulário. Tente novamente.',
          type: 'error',
        });
        console.error('Erro ao enviar formulário:', error);
      }
    );
  }
}
