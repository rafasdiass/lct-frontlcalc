import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface para a estrutura de dados do gráfico
interface GraphDataPoint {
  label: string; // Rótulo do eixo X
  value: number; // Valor associado ao rótulo
}

@Component({
  selector: 'app-graph-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss'],
})
export class GraphDisplayComponent {
  @Input() graphData: GraphDataPoint[] = []; // Uso da interface tipada

  hasGraphData(): boolean {
    return this.graphData.length > 0;
  }
}
