import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss'],
})
export class GraphDisplayComponent {
  @Input() graphData: any[] = []; // Tipagem pode ser especificada de acordo com a estrutura de dados do gráfico

  // Método auxiliar para verificar se os dados do gráfico estão disponíveis
  hasGraphData(): boolean {
    return this.graphData.length > 0;
  }
}
