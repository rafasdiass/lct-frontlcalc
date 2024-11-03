import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  imports: [CommonModule],
})
export class LoadingIndicatorComponent {
  @Input() isLoading: boolean = false; // Controla a visibilidade do indicador de carregamento
}
