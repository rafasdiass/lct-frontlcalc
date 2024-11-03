// api.service.ts

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CalculationResult } from '../shared/models/calculation-data.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtém a estrutura completa dos dados do backend.
   * @returns Observable de CalculationResult contendo a estrutura recebida.
   */
  getEstruturaCompleta(): Observable<CalculationResult> {
    const url = `${this.baseUrl}/estrutura-completa/`;
    return this.http.get<CalculationResult>(url).pipe(
      tap((response) =>
        console.log('Estrutura recebida do backend:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Envia dados de cálculo para o backend e retorna os resultados.
   * @param data Dados de entrada para o cálculo.
   * @returns Observable de CalculationResult contendo os resultados dos cálculos.
   */
  sendCalculationData(data: any): Observable<CalculationResult> {
    const url = `${this.baseUrl}/calcular/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CalculationResult>(url, data, { headers }).pipe(
      tap((response) => console.log('Resposta recebida do backend:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Obtém os resultados dos cálculos previamente processados.
   * @returns Observable de CalculationResult contendo os resultados dos cálculos.
   */
  getCalculationResults(): Observable<CalculationResult> {
    const url = `${this.baseUrl}/resultados/`;
    return this.http.get<CalculationResult>(url).pipe(
      tap((response) =>
        console.log('Resultados de cálculos recebidos:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Solicita a geração de um relatório PDF do backend.
   * @returns Observable contendo o Blob do arquivo PDF.
   */
  getReport(): Observable<Blob> {
    const url = `${this.baseUrl}/gerar-relatorio/`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap(() => console.log('Relatório solicitado com sucesso.')),
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
