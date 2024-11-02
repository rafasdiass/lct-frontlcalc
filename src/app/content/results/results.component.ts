import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultTableComponent } from "./result-table/result-table.component";
import { GraphDisplayComponent } from "./graph-display/graph-display.component";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ResultTableComponent, GraphDisplayComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() title: string = 'Resultados';
  @Input() summary: string = '';

  // Método auxiliar para verificar se há resultados para exibir
  hasResults(): boolean {
    return this.summary.trim().length > 0;
  }
}
