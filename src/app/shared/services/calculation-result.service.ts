// calculation-result.service.ts

import { Injectable } from '@angular/core';
import { CalculationResult } from '../models/calculation-data.model'; // Importe o modelo apropriado

@Injectable({
  providedIn: 'root',
})
export class CalculationResultService {
  private result: CalculationResult | null = null;

  /**
   * Armazena o resultado do cálculo.
   * @param result O resultado do cálculo a ser armazenado.
   */
  setResult(result: CalculationResult): void {
    this.result = result;
  }

  /**
   * Retorna o resultado do cálculo armazenado.
   * @returns O resultado do cálculo ou null se não houver resultado.
   */
  getResult(): CalculationResult | null {
    return this.result;
  }
}
