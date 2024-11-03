import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  CalculationResult,
  GraphDataPoint,
  TableRow,
} from '../../shared/models/calculation-data.model';
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
  tableData: TableRow[] = [];
  columns: string[] = [];
  graphData: GraphDataPoint[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCalculationResults();
  }

  private fetchCalculationResults(): void {
    this.apiService.getCalculationResults().subscribe(
      (data: CalculationResult) => {
        this.summary = data.summary || 'Dados processados do backend';
        this.tableData = data.tableData || [];
        this.columns = data.columns || [];
        this.graphData = data.graphData || [];
      },
      (error) => {
        console.error('Erro ao buscar estrutura do backend:', error);
      }
    );
  }
}
