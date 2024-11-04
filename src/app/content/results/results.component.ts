// results.component.ts

import { Component, OnInit } from '@angular/core';
import { CalculationResultService } from '../../shared/services/calculation-result.service';
import {
  PilarResult,
  VigaResult,
  LajeResult,
  ArcoResult,
  TrelicaResult,
  VigaContinuaResult,
  FlechaResult,
  DetalhamentoResult,
  FundacaoResult,
} from '../../shared/models/calculation-interface.model';
import { CommonModule } from '@angular/common';
import { GraphDisplayComponent } from './graph-display/graph-display.component';
import { ResultTableComponent } from './result-table/result-table.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [CommonModule, GraphDisplayComponent, ResultTableComponent],
})
export class ResultsComponent implements OnInit {
  title: string = 'Resultados';
  summary: string = '';
  tableData: any[] = [];
  columns: string[] = [];
  graphData: any[] = [];
  result: any;

  constructor(private calculationResultService: CalculationResultService) {}

  ngOnInit(): void {
    this.getCalculationResult();
  }

  private getCalculationResult(): void {
    this.result = this.calculationResultService.getResult();
    if (!this.result) {
      // Se não houver resultado, exibir uma mensagem
      this.summary = 'Nenhum resultado disponível.';
      return;
    }

    // Processar o resultado com base no tipo
    if (this.result.hasOwnProperty('tensao_normal')) {
      // Resultado do Pilar
      const pilarResult = this.result as PilarResult;
      this.summary = `Tensão Normal Calculada: ${pilarResult.tensao_normal} Pa`;
      this.tableData = [
        { propriedade: 'Área', valor: pilarResult.area },
        {
          propriedade: 'Material Utilizado',
          valor: pilarResult.material_utilizado,
        },
        {
          propriedade: 'Verificação de Resistência',
          valor: pilarResult.verificacao_resistencia ? 'Sim' : 'Não',
        },
        { propriedade: 'Mensagem', valor: pilarResult.mensagem || 'N/A' },
      ];
      this.columns = ['propriedade', 'valor'];
    }
    // Adicionar outros tipos de resultados conforme necessário
    else if (this.result.hasOwnProperty('momento_fletor_maximo')) {
      // Resultado da Viga
      const vigaResult = this.result as VigaResult;
      this.summary = `Momento Fletor Máximo: ${vigaResult.momento_fletor_maximo} Nm`;
      this.tableData = [
        { propriedade: 'Tensão Máxima', valor: vigaResult.tensao_maxima },
        { propriedade: 'Deformação', valor: vigaResult.deformacao },
        {
          propriedade: 'Material Utilizado',
          valor: vigaResult.material_utilizado,
        },
        {
          propriedade: 'Verificação de Resistência',
          valor: vigaResult.verificacao_resistencia ? 'Sim' : 'Não',
        },
        { propriedade: 'Mensagem', valor: vigaResult.mensagem || 'N/A' },
      ];
      this.columns = ['propriedade', 'valor'];
    }
    // Outros tipos de resultados podem ser processados aqui
    else {
      // Se o tipo de resultado não for reconhecido
      this.summary = 'Tipo de resultado não reconhecido.';
    }
  }

  hasTableData(): boolean {
    return this.tableData.length > 0 && this.columns.length > 0;
  }

  hasGraphData(): boolean {
    return this.graphData.length > 0;
  }
}
