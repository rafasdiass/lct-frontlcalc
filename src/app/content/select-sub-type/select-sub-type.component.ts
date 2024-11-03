import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-sub-type',
  templateUrl: './select-sub-type.component.html',
  styleUrls: ['./select-sub-type.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SelectSubTypeComponent implements OnChanges {
  @Input() selectedCategory: string | null = null;
  @Output() subTypeSelected = new EventEmitter<string>();

  subTypes: string[] = [];

  ngOnChanges(): void {
    this.loadSubTypes();
  }

  private loadSubTypes(): void {
    if (this.selectedCategory) {
      if (this.selectedCategory === 'fundacao') {
        this.subTypes = [
          'Barrete',
          'Bloco',
          'Estaca',
          'Estaca Hélice Contínua',
          'Radier',
          'Sapata Corrida',
          'Sapata Rígida',
          'Sapata',
          'Tubulão Ar Comprimido',
          'Tubulão Céu Aberto',
          'Tubulão',
        ];
      } else if (this.selectedCategory === 'estrutura') {
        this.subTypes = [
          'Pilar',
          'Viga',
          'Laje',
          'Arco',
          'Treliça',
          'Viga Contínua',
          'Flecha',
          'Detalhamento',
        ];
      } else {
        this.subTypes = [];
      }
    } else {
      this.subTypes = [];
    }
  }

  onSubTypeSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target?.value ?? '';
    console.log(`Subtipo selecionado: ${selectedValue}`);
    this.subTypeSelected.emit(selectedValue);
  }
}
