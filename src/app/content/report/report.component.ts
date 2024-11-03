import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { CalculationResult } from '../../shared/models/calculation-data.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  reportData: Array<{ parameter: string; value: string | number }> = [];
  reportConclusion: string = '';
  currentDate: string = '';

  constructor(private apiService: ApiService) {}

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
    this.apiService.getCalculationResults().subscribe(
      (data: CalculationResult) => {
        this.reportData = this.transformDataToTableFormat(data);
        if (typeof data.Conclusão === 'string') {
          this.reportConclusion = data.Conclusão;
        } else {
          this.reportConclusion = 'Resultados dentro dos limites aceitáveis.';
        }
      },
      (error) => {
        console.error('Erro ao carregar os dados do relatório:', error);
      }
    );
  }

  private transformDataToTableFormat(
    data: CalculationResult
  ): Array<{ parameter: string; value: string | number }> {
    const formattedData: Array<{ parameter: string; value: string | number }> =
      [];
    for (const [key, value] of Object.entries(data)) {
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

    (doc as any).autoTable({
      startY: 45,
      head: [['Parâmetro', 'Valor']],
      body: tableBody,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [44, 44, 44] }, // Cor de fundo da tabela (marrom escuro)
    });

    // Adicionar a conclusão na página
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Conclusão:', 14, finalY);
    doc.setFontSize(10);
    doc.text(this.reportConclusion, 14, finalY + 5);

    // Salvar o PDF
    doc.save(`relatorio_calculo_${new Date().toISOString().slice(0, 10)}.pdf`);
    console.log('Relatório em PDF gerado com sucesso.');
  }
}
