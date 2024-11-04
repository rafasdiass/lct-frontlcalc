// submit-button.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {
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
} from '../../../shared/models/calculation-interface.model';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';
import { CalculationResultService } from '../../../shared/services/calculation-result.service';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  standalone: true,
  imports: [],
})
export class SubmitButtonComponent {
  @Input() calculationData: { [key: string]: string | number } = {};
  @Input() selectedType: string | null = null;
  @Input() selectedSubType: string | null = null;
  @Input() isLoading: boolean = false;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() feedbackMessage = new EventEmitter<{
    message: string;
    type: 'success' | 'error' | 'info';
  }>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private calculationResultService: CalculationResultService
  ) {}

  onSubmit(): void {
    if (!this.selectedType) {
      this.feedbackMessage.emit({
        message: 'Selecione um tipo de cálculo antes de enviar.',
        type: 'error',
      });
      return;
    }

    this.isLoading = true;

    // Chamar o método correto do ApiService com base no tipo selecionado
    let calculationObservable: Observable<any>;

    try {
      switch (this.selectedType.toLowerCase()) {
        case 'pilar':
          const pilarData: PilarInput = {
            largura: Number(this.calculationData['largura']),
            altura: Number(this.calculationData['altura']),
            carga: Number(this.calculationData['carga']),
            material: String(this.calculationData['material']),
          };
          calculationObservable = this.apiService.calcularPilar(pilarData);
          break;
        case 'viga':
          const vigaData: VigaInput = {
            largura: Number(this.calculationData['largura']),
            altura: Number(this.calculationData['altura']),
            comprimento: Number(this.calculationData['comprimento']),
            carga: Number(this.calculationData['carga']),
            material: String(this.calculationData['material']),
            tipo_carga: String(this.calculationData['tipo_carga']),
            tipo_apoio: String(this.calculationData['tipo_apoio']),
          };
          calculationObservable = this.apiService.calcularViga(vigaData);
          break;
        case 'laje':
          const lajeData: LajeInput = {
            largura: Number(this.calculationData['largura']),
            comprimento: Number(this.calculationData['comprimento']),
            carga: Number(this.calculationData['carga']),
            material: String(this.calculationData['material']),
          };
          calculationObservable = this.apiService.calcularLaje(lajeData);
          break;
        case 'arco':
          const arcoData: ArcoInput = {
            largura: Number(this.calculationData['largura']),
            espessura: Number(this.calculationData['espessura']),
            raio: Number(this.calculationData['raio']),
            carga: Number(this.calculationData['carga']),
            material: String(this.calculationData['material']),
          };
          calculationObservable = this.apiService.calcularArco(arcoData);
          break;
        case 'trelica':
          const trelicaData: TrelicaInput = {
            largura: Number(this.calculationData['largura']),
            altura: Number(this.calculationData['altura']),
            carga: Number(this.calculationData['carga']),
            material: String(this.calculationData['material']),
          };
          calculationObservable = this.apiService.calcularTrelica(trelicaData);
          break;
        case 'viga-continua':
          const vigaContinuaData: VigaContinuaInput = {
            largura: Number(this.calculationData['largura']),
            altura: Number(this.calculationData['altura']),
            comprimento_total: Number(
              this.calculationData['comprimento_total']
            ),
            numero_apoios: Number(this.calculationData['numero_apoios']),
            carga_distribuida: Number(
              this.calculationData['carga_distribuida']
            ),
            material: String(this.calculationData['material']),
          };
          calculationObservable =
            this.apiService.calcularVigaContinua(vigaContinuaData);
          break;
        case 'flecha':
          const flechaData: FlechaInput = {
            largura: Number(this.calculationData['largura']),
            altura: Number(this.calculationData['altura']),
            comprimento: Number(this.calculationData['comprimento']),
            carga_distribuida: Number(
              this.calculationData['carga_distribuida']
            ),
            material: String(this.calculationData['material']),
            tipo_apoio: String(this.calculationData['tipo_apoio']),
          };
          calculationObservable = this.apiService.calcularFlecha(flechaData);
          break;
        case 'detalhamento':
          const detalhamentoData: DetalhamentoInput = {
            elemento: String(this.calculationData['elemento']),
            material: String(this.calculationData['material']),
            // Outros parâmetros específicos
          };
          calculationObservable =
            this.apiService.calcularDetalhamento(detalhamentoData);
          break;
        case 'fundacao':
          const fundacaoData: FundacaoInput = {
            tipo_fundacao: String(this.calculationData['tipo_fundacao']),
            carga: Number(this.calculationData['carga']),
            profundidade: Number(this.calculationData['profundidade']),
            solo: String(this.calculationData['solo']),
            // Outros parâmetros específicos
          };
          calculationObservable =
            this.apiService.calcularFundacao(fundacaoData);
          break;
        default:
          this.isLoading = false;
          this.feedbackMessage.emit({
            message: 'Tipo de cálculo não suportado.',
            type: 'error',
          });
          return;
      }
    } catch (error) {
      this.isLoading = false;
      this.feedbackMessage.emit({
        message: 'Erro nos dados de entrada. Verifique os valores informados.',
        type: 'error',
      });
      console.error('Erro nos dados de entrada:', error);
      return;
    }

    calculationObservable.subscribe(
      (resultado: any) => {
        this.isLoading = false;
        this.feedbackMessage.emit({
          message: 'Cálculo realizado com sucesso!',
          type: 'success',
        });
        // Armazenar o resultado no serviço
        this.calculationResultService.setResult(resultado);
        this.formSubmitted.emit();
        this.router.navigate(['/results']);
      },
      (error: any) => {
        this.isLoading = false;
        this.feedbackMessage.emit({
          message: 'Erro ao realizar o cálculo. Tente novamente.',
          type: 'error',
        });
        console.error('Erro ao realizar o cálculo:', error);
      }
    );
  }
}
