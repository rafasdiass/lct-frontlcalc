import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldsComponent } from './input-fields/input-fields.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { SelectCalculationTypeComponent } from '../select-calculation-type/select-calculation-type.component';
import { SelectSubTypeComponent } from '../select-sub-type/select-sub-type.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ErrorNotificationComponent } from '../error-notification/error-notification.component'; // Importação adicionada

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFieldsComponent,
    SubmitButtonComponent,
    SelectCalculationTypeComponent,
    SelectSubTypeComponent,
    LoadingIndicatorComponent,
    FeedbackComponent,
    ErrorNotificationComponent, // Componente de notificação de erro adicionado
  ],
})
export class InputFormComponent {
  isLoading: boolean = false;
  selectedType: string | null = null;
  selectedSubType: string | null = null;
  calculationData: { [key: string]: string | number } = {};
  feedback: { message: string; type: 'success' | 'error' | 'info' } | null =
    null;
  errorMessage: string = ''; // Propriedade para a mensagem de erro

  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.selectedSubType = null; // Resetar subtipo ao mudar de tipo principal
    console.log(`Tipo de cálculo selecionado: ${type}`);
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }

  onSubTypeSelected(subType: string): void {
    this.selectedSubType = subType;
    console.log(`Subtipo de cálculo selecionado: ${subType}`);
  }

  onFieldValuesChanged(values: { [key: string]: string | number }): void {
    this.calculationData = values;
    console.log('Dados atualizados:', this.calculationData);
  }

  onFeedbackReceived(feedback: {
    message: string;
    type: 'success' | 'error' | 'info';
  }): void {
    this.feedback = feedback;
  }

  // Método para definir uma mensagem de erro
  setError(message: string): void {
    this.errorMessage = message;
  }
}
