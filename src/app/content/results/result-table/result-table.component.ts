import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  @Input() tableData: Array<{ [key: string]: any }> = [];
  @Input() columns: string[] = [];

  // Método auxiliar para verificar se há dados para exibir na tabela
  hasTableData(): boolean {
    return this.tableData.length > 0 && this.columns.length > 0;
  }
}
