import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { CalculationData } from '../../../shared/models/calculation-data.model';
import { Observable } from 'rxjs';

interface Campo {
  nome: string;
  obrigatorio: boolean;
  tipo: string;
}

interface Metadados {
  descricao: string;
  [key: string]: any;
}

@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss'],
})
export class InputFieldsComponent implements OnInit {
  @Input() tipoPeca: string = '';
  campos: Campo[] = [];
  metadados: Metadados | null = null;
  formData: { [key: string]: any } = {};

  @Output() dataSubmitted: EventEmitter<CalculationData> =
    new EventEmitter<CalculationData>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.tipoPeca) {
      this.apiService.getEstruturaCompleta().subscribe({
        next: (res: {
          [key: string]: { campos: Campo[]; metadados: Metadados };
        }) => {
          if (res[this.tipoPeca]) {
            this.campos = res[this.tipoPeca].campos;
            this.metadados = res[this.tipoPeca].metadados;
            this.inicializarFormData();
          } else {
            console.error(`Tipo de peça ${this.tipoPeca} não encontrado.`);
          }
        },
        error: (err: any) =>
          console.error('Erro ao buscar a estrutura dos campos:', err),
      });
    }
  }

  inicializarFormData(): void {
    this.campos.forEach((campo: Campo) => {
      this.formData[campo.nome] = campo.obrigatorio ? '' : null;
    });
  }

  submitData(): void {
    if (this.validarCampos()) {
      this.dataSubmitted.emit(this.formData as CalculationData);
    } else {
      console.error('Todos os campos obrigatórios devem ser preenchidos.');
    }
  }

  private validarCampos(): boolean {
    return this.campos.every(
      (campo: Campo) =>
        !campo.obrigatorio ||
        this.formData[campo.nome]?.toString().trim() !== ''
    );
  }
}
