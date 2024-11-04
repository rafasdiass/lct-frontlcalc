// report.component.ts

import { Component, OnInit } from '@angular/core';
import { CalculationResultService } from '../../shared/services/calculation-result.service';
import { CalculationResult } from '../../shared/models/calculation-data.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';

// Módulo de declaração para estender a interface jsPDF e incluir lastAutoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ReportComponent implements OnInit {
  reportData: Array<{ parameter: string; value: string | number }> = [];
  reportConclusion: string = '';
  currentDate: string = '';

  constructor(private calculationResultService: CalculationResultService) {}

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.loadReportData();
  }

  private loadReportData(): void {
    const data = this.calculationResultService.getResult();

    if (data) {
      this.reportData = this.transformDataToTableFormat(data);
      if (typeof data.conclusao === 'string') {
        this.reportConclusion = data.conclusao;
      } else {
        this.reportConclusion = 'Resultados dentro dos limites aceitáveis.';
      }
    } else {
      console.error('Nenhum resultado de cálculo disponível.');
      // Você pode redirecionar o usuário ou exibir uma mensagem apropriada
    }
  }

  private transformDataToTableFormat(
    data: CalculationResult
  ): Array<{ parameter: string; value: string | number }> {
    const formattedData: Array<{ parameter: string; value: string | number }> =
      [];

    for (const [key, value] of Object.entries(data)) {
      if (key !== 'conclusao') {
        if (typeof value !== 'object' || value === null) {
          formattedData.push({ parameter: key, value: String(value) });
        } else {
          for (const [subKey, subValue] of Object.entries(value)) {
            formattedData.push({
              parameter: `${key} - ${subKey}`,
              value: String(subValue),
            });
          }
        }
      }
    }

    return formattedData;
  }

  downloadReport(): void {
    const doc = new jsPDF();
    const title = 'Relatório de Cálculo Estrutural - LCT Calculator';
    const date = `Data de geração: ${this.currentDate}`;

    doc.setFontSize(14);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(date, 14, 30);

    doc.setFontSize(12);
    doc.text('Detalhes do Cálculo:', 14, 40);

    const tableBody = this.reportData.map((item) => [
      item.parameter,
      item.value,
    ]);

    // Uso do autoTable sem 'any'
    autoTable(doc, {
      startY: 45,
      head: [['Parâmetro', 'Valor']],
      body: tableBody,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [44, 44, 44] }, // Cor de fundo da tabela (marrom escuro)
    });

    // Adicionar a conclusão na página
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 45;
    const nextY = finalY + 10;
    doc.text('Conclusão:', 14, nextY);
    doc.setFontSize(10);
    doc.text(this.reportConclusion, 14, nextY + 5);

    // Salvar o PDF
    doc.save(`relatorio_calculo_${new Date().toISOString().slice(0, 10)}.pdf`);
    console.log('Relatório em PDF gerado com sucesso.');
  }
}
