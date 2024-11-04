// api.service.ts

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Importar modelos ou interfaces conforme necessário
import {
  EstruturaCompleta,
  Material,
  Solo,
  PilarInput,
  PilarResult,
  VigaInput,
  VigaResult,
  LajeInput,
  LajeResult,
  ArcoInput,
  ArcoResult,
  TrelicaInput,
  TrelicaResult,
  VigaContinuaInput,
  VigaContinuaResult,
  FlechaInput,
  FlechaResult,
  DetalhamentoInput,
  DetalhamentoResult,
  FundacaoInput,
  FundacaoResult,
} from '../models/calculation-interface.model'; // Assumindo que você tem um arquivo models.ts com as interfaces

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = 'http://localhost:8000'; // Ajuste conforme a configuração do seu backend

  constructor(private http: HttpClient) {}

  /**
   * Obtém a estrutura completa dos campos necessários para cada cálculo.
   * @returns Observable contendo a estrutura recebida.
   */
  getEstruturaCompleta(): Observable<EstruturaCompleta> {
    const url = `${this.baseUrl}/estrutura-completa/`;
    return this.http.get<EstruturaCompleta>(url).pipe(
      tap((response) =>
        console.log('Estrutura completa recebida do backend:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Obtém a lista de materiais disponíveis.
   * @returns Observable contendo a lista de materiais.
   */
  getMateriaisDisponiveis(): Observable<{ materiais: Material[] }> {
    const url = `${this.baseUrl}/materiais-disponiveis/`;
    return this.http.get<{ materiais: Material[] }>(url).pipe(
      tap((response) =>
        console.log('Materiais disponíveis recebidos do backend:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Obtém a lista de solos disponíveis.
   * @returns Observable contendo a lista de solos.
   */
  getSolosDisponiveis(): Observable<{ solos: Solo[] }> {
    const url = `${this.baseUrl}/solos-disponiveis/`;
    return this.http.get<{ solos: Solo[] }>(url).pipe(
      tap((response) =>
        console.log('Solos disponíveis recebidos do backend:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Envia dados para calcular um pilar.
   * @param data Dados de entrada para o cálculo do pilar.
   * @returns Observable contendo os resultados do cálculo.
   */
  calcularPilar(data: PilarInput): Observable<PilarResult> {
    const url = `${this.baseUrl}/calcular/pilar/`;
    return this.http.post<PilarResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de pilar recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  // Métodos similares para outros cálculos:

  calcularViga(data: VigaInput): Observable<VigaResult> {
    const url = `${this.baseUrl}/calcular/viga/`;
    return this.http.post<VigaResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de viga recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularLaje(data: LajeInput): Observable<LajeResult> {
    const url = `${this.baseUrl}/calcular/laje/`;
    return this.http.post<LajeResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de laje recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularArco(data: ArcoInput): Observable<ArcoResult> {
    const url = `${this.baseUrl}/calcular/arco/`;
    return this.http.post<ArcoResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de arco recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularTrelica(data: TrelicaInput): Observable<TrelicaResult> {
    const url = `${this.baseUrl}/calcular/trelica/`;
    return this.http.post<TrelicaResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de treliça recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularVigaContinua(
    data: VigaContinuaInput
  ): Observable<VigaContinuaResult> {
    const url = `${this.baseUrl}/calcular/viga-continua/`;
    return this.http.post<VigaContinuaResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de viga contínua recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularFlecha(data: FlechaInput): Observable<FlechaResult> {
    const url = `${this.baseUrl}/calcular/flecha/`;
    return this.http.post<FlechaResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de flecha recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularDetalhamento(
    data: DetalhamentoInput
  ): Observable<DetalhamentoResult> {
    const url = `${this.baseUrl}/calcular/detalhamento/`;
    return this.http.post<DetalhamentoResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de detalhamento recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  calcularFundacao(data: FundacaoInput): Observable<FundacaoResult> {
    const url = `${this.baseUrl}/calcular/fundacao/`;
    return this.http.post<FundacaoResult>(url, data).pipe(
      tap((response) =>
        console.log('Resultado do cálculo de fundação recebido:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Solicita a geração de um relatório PDF do backend.
   * @param data Dados necessários para a geração do relatório.
   * @returns Observable contendo o Blob do arquivo PDF.
   */
  exportarRelatorio(data: any): Observable<Blob> {
    const url = `${this.baseUrl}/exportar-relatorio/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers, responseType: 'blob' }).pipe(
      tap(() => console.log('Relatório PDF gerado com sucesso.')),
      catchError(this.handleError)
    );
  }
  /**
   * Método de tratamento de erros HTTP.
   * @param error Objeto de erro HTTP.
   * @returns Observable com erro formatado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na operação HTTP:', error);
    return throwError(
      () => new Error(`Erro na operação HTTP: ${error.message}`)
    );
  }
}
