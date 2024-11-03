import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  CalculationResult,
  CalculationRequest,
} from '../shared/models/calculation-data.model'; // Importando as interfaces

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
    console.log('Solicitando estrutura completa dos campos do backend.');

    return this.http.get<CalculationResult>(url).pipe(
      tap((response) =>
        this.logResponse('Estrutura recebida do backend:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Envia dados de cálculo para o backend e retorna os resultados.
   * @param data Dados de entrada para o cálculo.
   * @returns Observable de CalculationResult contendo os resultados dos cálculos.
   */
  sendCalculationData(data: CalculationRequest): Observable<CalculationResult> {
    const url = `${this.baseUrl}/calcular/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('Enviando dados para o backend:', data);

    return this.http.post<CalculationResult>(url, data, { headers }).pipe(
      tap((response) =>
        this.logResponse('Resposta recebida do backend:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Obtém os resultados dos cálculos previamente processados.
   * @returns Observable de CalculationResult contendo os resultados dos cálculos.
   */
  getCalculationResults(): Observable<CalculationResult> {
    const url = `${this.baseUrl}/resultados/`;
    console.log('Solicitando resultados de cálculos do backend.');

    return this.http.get<CalculationResult>(url).pipe(
      tap((response) =>
        this.logResponse('Resultados de cálculos recebidos:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Método de logging para imprimir mensagens e respostas no console.
   * @param message Mensagem a ser impressa.
   * @param data Dados relacionados à mensagem.
   */
  private logResponse(message: string, data: any): void {
    console.log(message, data);
  }

  /**
   * Manipula erros HTTP e retorna um Observable com o erro formatado.
   * @param error Objeto de erro HTTP.
   * @returns Observable que lança um novo erro formatado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na operação HTTP:', error);
    return throwError(
      () => new Error(`Erro na operação HTTP: ${error.message}`)
    );
  }
}
