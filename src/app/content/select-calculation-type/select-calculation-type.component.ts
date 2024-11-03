import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationType } from '../../shared/models/calc-type.model';

@Component({
  selector: 'app-select-calculation-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-calculation-type.component.html',
  styleUrls: ['./select-calculation-type.component.scss'],
})
export class SelectCalculationTypeComponent implements OnInit {
  @Output() typeSelected = new EventEmitter<string>();

  calculationTypes: CalculationType[] = [
    { id: 'fundacao', displayName: 'Fundação' },
    { id: 'estrutura', displayName: 'Estrutura' },
    // Outros tipos podem ser adicionados conforme necessário
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target?.value ?? '';
    console.log(`Tipo de cálculo selecionado: ${selectedValue}`);
    this.typeSelected.emit(selectedValue);
  }
}
