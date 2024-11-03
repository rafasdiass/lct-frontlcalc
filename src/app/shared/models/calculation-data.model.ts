// src/app/shared/models/calc-data.model.ts

// Interface para a estrutura de uma solicitação de cálculo
export interface CalculationRequest {
  tipo: string; // Tipo de cálculo (ex: 'pilar', 'viga', 'fundacao', etc.)
  subtipo?: string; // Subtipo de cálculo, se aplicável
  parametros: { [key: string]: number | string }; // Parâmetros de entrada, como dimensões e carga
}

// Interface para a estrutura de um resultado de cálculo
export interface CalculationResult {
  summary: string; // Resumo do resultado
  tableData: TableRow[]; // Dados para exibição em tabela
  columns: string[]; // Colunas para a tabela de resultados
  graphData: GraphDataPoint[]; // Dados do gráfico
}

// Interface para definir uma linha de dados da tabela
export interface TableRow {
  [key: string]: string | number | boolean; // Tipagem específica para os valores das células da tabela
}

// Interface para um ponto de dados em um gráfico
export interface GraphDataPoint {
  label: string; // Rótulo do eixo X
  value: number; // Valor associado ao rótulo
}
