import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import {
  Material,
  Solo,
} from '../../../shared/models/calculation-interface.model';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class InputFieldsComponent implements OnChanges {
  @Input() selectedType: string | null = null;
  @Input() selectedSubType: string | null = null;
  @Output() fieldValuesChanged = new EventEmitter<{
    [key: string]: string | number;
  }>();

  fields: string[] = [];
  fieldValues: { [key: string]: string | number } = {};

  // Adicionando materiais e solos disponíveis
  materiaisDisponiveis: Material[] = [];
  solosDisponiveis: Solo[] = [];

  // Definindo quais campos são dropdowns
  dropdownFields: string[] = ['Tipo de Solo', 'Material'];

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedType'] || changes['selectedSubType']) {
      this.fields = this.getFields();
      this.initializeFieldValues();
      this.loadOptions(); // Carregar opções de materiais e solos
    }
  }

  getFields(): string[] {
    if (this.selectedType === 'fundacao') {
      switch (this.selectedSubType) {
        case 'Barrete':
          return ['Profundidade', 'Largura', 'Carga Máxima', 'Tipo de Solo'];
        case 'Bloco':
          return ['Dimensões', 'Carga Máxima', 'Material'];
        case 'Estaca':
          return ['Comprimento', 'Diâmetro', 'Tipo de Solo'];
        case 'Estaca Hélice Contínua':
          return ['Comprimento', 'Diâmetro', 'Material', 'Tipo de Solo'];
        case 'Radier':
          return ['Área', 'Espessura', 'Carga Máxima'];
        case 'Sapata Corrida':
          return ['Comprimento', 'Largura', 'Carga'];
        case 'Sapata Rígida':
          return ['Altura', 'Largura', 'Carga Máxima'];
        case 'Tubulão Ar Comprimido':
          return ['Profundidade', 'Pressão Máxima', 'Tipo de Solo'];
        case 'Tubulão Céu Aberto':
          return ['Profundidade', 'Largura', 'Material'];
        case 'Tubulão':
          return ['Profundidade', 'Diâmetro', 'Tipo de Solo'];
        default:
          return ['Profundidade', 'Largura', 'Altura', 'Carga'];
      }
    } else if (this.selectedType === 'estrutura') {
      switch (this.selectedSubType) {
        case 'Pilar':
          return ['Largura', 'Altura', 'Carga'];
        case 'Viga':
          return ['Comprimento', 'Largura', 'Altura', 'Carga'];
        case 'Laje':
          return ['Área', 'Espessura', 'Carga'];
        case 'Arco':
          return ['Raio', 'Largura', 'Altura', 'Carga'];
        case 'Treliça':
          return ['Número de Nós', 'Número de Barras', 'Cargas', 'Restrições'];
        case 'Viga Contínua':
          return ['Comprimento Total', 'Seções', 'Carga'];
        case 'Flecha':
          return ['Comprimento', 'Carga', 'Material'];
        case 'Detalhamento':
          return ['Tipo de Detalhe', 'Dimensões', 'Carga'];
        default:
          return [];
      }
    } else {
      return [];
    }
  }

  onFieldChange(fieldName: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.value !== null) {
      this.fieldValues[fieldName] = target.value;
      this.fieldValuesChanged.emit(this.fieldValues);
    }
  }

  onSelectChange(fieldName: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value !== null) {
      this.fieldValues[fieldName] = target.value;
      this.fieldValuesChanged.emit(this.fieldValues);
    }
  }

  private initializeFieldValues(): void {
    this.fieldValues = {};
    this.fields.forEach((field) => {
      this.fieldValues[field] = '';
    });
  }

  private loadOptions(): void {
    // Se o cálculo envolve materiais, carregue-os
    if (this.fields.includes('Material')) {
      this.apiService.getMateriaisDisponiveis().subscribe(
        (data) => {
          this.materiaisDisponiveis = data.materiais;
        },
        (error: any) => {
          console.error('Erro ao obter materiais disponíveis:', error);
        }
      );
    }

    // Se o cálculo envolve solos, carregue-os
    if (this.fields.includes('Tipo de Solo')) {
      this.apiService.getSolosDisponiveis().subscribe(
        (data) => {
          this.solosDisponiveis = data.solos;
        },
        (error: any) => {
          console.error('Erro ao obter solos disponíveis:', error);
        }
      );
    }
  }
}
