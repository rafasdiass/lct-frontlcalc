import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CalculationData } from './models/calculation-data.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = 'http://localhost:8000/api'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  /**
   * Envia dados de cálculo para o backend.
   * @param data Dados do formulário de entrada.
   * @returns Observable com a resposta do backend.
   */
  sendCalculationData<T>(data: T): Observable<any> {
    const url = `${this.baseUrl}/calculate/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(url, data, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Busca os resultados dos cálculos do backend.
   * @returns Observable com os resultados dos cálculos.
   */
  getCalculationResults(): Observable<any> {
    const url = `${this.baseUrl}/results/`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  /**
   * Obtém a estrutura completa para exibição dos campos de formulário.
   * @returns Observable com a estrutura dos campos.
   */
  getEstruturaCompleta(): Observable<{
    [key: string]: {
      campos: { nome: string; obrigatorio: boolean; tipo: string }[];
      metadados: { descricao: string; [key: string]: any };
    };
  }> {
    const url = `${this.baseUrl}/estrutura-completa/`;
    return this.http
      .get<{
        [key: string]: {
          campos: { nome: string; obrigatorio: boolean; tipo: string }[];
          metadados: { descricao: string; [key: string]: any };
        };
      }>(url)
      .pipe(catchError(this.handleError));
  }

  /**
   * Manipulador de erros para operações HTTP.
   * @param error O erro recebido da operação HTTP.
   * @returns Um Observable que lança um erro formatado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Erro na operação HTTP: ${error.message}`);
    return throwError(
      () => new Error(`Erro na operação HTTP: ${error.message}`)
    );
  }
}
