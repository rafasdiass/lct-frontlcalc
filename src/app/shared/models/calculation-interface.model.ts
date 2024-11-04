// calculation-interfaces.ts

export interface Material {
  codigo: string;
  nome: string;
  resistencia: number;
  densidade: number;
  modulo_elasticidade: number;
}

export interface Solo {
  codigo: string;
  nome: string;
  capacidade_carga: number;
  coeficiente_atrito: number;
  compressibilidade: number;
}

export interface EstruturaCompleta {
  [elemento: string]: {
    numericos: string[];
    opcoes: {
      [opcao: string]: string[] | Material[] | Solo[];
    };
  };
}

// Interfaces para entrada e saída dos cálculos

// Pilar
export interface PilarInput {
  largura: number;
  altura: number;
  carga: number;
  material: string;
}

export interface PilarResult {
  area: number;
  tensao_normal: number;
  material_utilizado: string;
  verificacao_resistencia: boolean;
  mensagem?: string;
}

// Viga
export interface VigaInput {
  largura: number;
  altura: number;
  comprimento: number;
  carga: number;
  material: string;
  tipo_carga: string;
  tipo_apoio: string;
}

export interface VigaResult {
  momento_fletor_maximo: number;
  tensao_maxima: number;
  deformacao: number;
  material_utilizado: string;
  verificacao_resistencia: boolean;
  mensagem?: string;
}

// Laje
export interface LajeInput {
  largura: number;
  comprimento: number;
  carga: number;
  material: string;
}

export interface LajeResult {
  espessura_recomendada: number;
  armadura_necessaria: number;
  material_utilizado: string;
  verificacao_resistencia: boolean;
  mensagem?: string;
}

// Arco
export interface ArcoInput {
  largura: number;
  espessura: number;
  raio: number;
  carga: number;
  material: string;
}

export interface ArcoResult {
  tensao_normal: number;
  deformacao: number;
  material_utilizado: string;
  verificacao_resistencia: boolean;
  mensagem?: string;
}

// Treliça
export interface TrelicaInput {
  largura: number;
  altura: number;
  carga: number;
  material: string;
}

export interface ForcaBarra {
  barra: string;
  forca: number;
}

export interface TrelicaResult {
  forcas_barras: ForcaBarra[];
  material_utilizado: string;
  verificacao_resistencia: boolean;
  mensagem?: string;
}

// Viga Contínua
export interface VigaContinuaInput {
  largura: number;
  altura: number;
  comprimento_total: number;
  numero_apoios: number;
  carga_distribuida: number;
  material: string;
}

export interface VigaContinuaResult {
  momentos_fletores: number[];
  tensoes_maximas: number[];
  deformacoes: number[];
  material_utilizado: string;
  verificacao_resistencia: boolean;
  mensagem?: string;
}

// Flecha
export interface FlechaInput {
  largura: number;
  altura: number;
  comprimento: number;
  carga_distribuida: number;
  material: string;
  tipo_apoio: string;
}

export interface FlechaResult {
  flecha_maxima: number;
  material_utilizado: string;
  atende_limite_flecha: boolean;
  mensagem?: string;
}

// Detalhamento
export interface DetalhamentoInput {
  elemento: string;
  material: string;
  // Outros parâmetros específicos para o detalhamento
}

export interface EspecificacoesDetalhamento {
  bitolas: number[];
  espacamento: number;
  cobrimento: number;
  // Outros campos específicos do detalhamento
}

export interface DetalhamentoResult {
  desenho: string; // Pode ser uma URL ou base64
  especificacoes: EspecificacoesDetalhamento;
  material_utilizado: string;
  mensagem?: string;
}

// Fundação
export interface FundacaoInput {
  tipo_fundacao: string;
  carga: number;
  profundidade: number;
  solo: string;
  // Outros parâmetros específicos para fundação
}

export interface DimensoesFundacao {
  largura: number;
  comprimento: number;
  altura: number;
}

export interface FundacaoResult {
  area_base: number;
  pressao_solo: number;
  dimensoes: DimensoesFundacao;
  solo_utilizado: string;
  verificacao_solo: boolean;
  mensagem?: string;
}
