Aqui está a versão atualizada do README com a estrutura correta da árvore de pastas, o novo wireframe em texto e o resultado final após o merge.

```markdown
# LCT Calculator - Projeto Angular

## Visão Geral
O LCT Calculator é um projeto Angular desenvolvido para fornecer uma interface intuitiva para realizar cálculos estruturais e apresentar os resultados processados pelo backend.

## Estrutura de Pastas do Projeto

```
src/app/
|-- content/
|   |-- header/
|   |   |-- header.component.ts
|   |   |-- header.component.html
|   |   |-- header.component.css
|   |
|   |-- footer/
|   |   |-- footer.component.ts
|   |   |-- footer.component.html
|   |   |-- footer.component.css
|   |
|   |-- sidebar/
|   |   |-- sidebar.component.ts
|   |   |-- sidebar.component.html
|   |   |-- sidebar.component.css
|   |
|   |-- home/
|   |   |-- home.component.ts
|   |   |-- home.component.html
|   |   |-- home.component.css
|   |
|   |-- input-form/
|   |   |-- input-form.component.ts
|   |   |-- input-form.component.html
|   |   |-- input-form.component.css
|   |   |-- input-fields/
|   |   |   |-- input-fields.component.ts
|   |   |   |-- input-fields.component.html
|   |   |   |-- input-fields.component.css
|   |   |-- submit-button/
|   |       |-- submit-button.component.ts
|   |       |-- submit-button.component.html
|   |       |-- submit-button.component.css
|   |
|   |-- results/
|   |   |-- results.component.ts
|   |   |-- results.component.html
|   |   |-- results.component.css
|   |   |-- result-table/
|   |   |   |-- result-table.component.ts
|   |   |   |-- result-table.component.html
|   |   |   |-- result-table.component.css
|   |   |-- graph-display/
|   |       |-- graph-display.component.ts
|   |       |-- graph-display.component.html
|   |       |-- graph-display.component.css
|   |
|   |-- feedback/
|   |   |-- feedback.component.ts
|   |   |-- feedback.component.html
|   |   |-- feedback.component.css
|   |
|   |-- select-calculation-type/
|   |   |-- select-calculation-type.component.ts
|   |   |-- select-calculation-type.component.html
|   |   |-- select-calculation-type.component.css
|   |
|   |-- loading-indicator/
|   |   |-- loading-indicator.component.ts
|   |   |-- loading-indicator.component.html
|   |   |-- loading-indicator.component.css
|   |
|   |-- error-notification/
|   |   |-- error-notification.component.ts
|   |   |-- error-notification.component.html
|   |   |-- error-notification.component.css
|   |
|   |-- history/
|       |-- history.component.ts
|       |-- history.component.html
|       |-- history.component.css
|
|-- shared/
|   |-- api.service.ts
|   |-- notification.service.ts
|   |-- models/
|       |-- calc-data.model.ts
|       |-- result-data.model.ts
```

## Wireframe de Texto do Front-End

```
+-------------------------------------+
|            HeaderComponent          |
+-------------------------------------+
| SidebarComponent | MainContent      |
|                  |                  |
| +-------------------------------+   |
| | SelectCalculationTypeComponent|   |
| +-------------------------------+   |
| |                               |   |
| | CalculationFormComponent      |   |
| | - Tipo de peça                |   |
| | - Largura (input)             |   |
| | - Altura (input)              |   |
| | - Carga (input)               |   |
| | - Botão Enviar                |   |
| |                               |   |
| +-------------------------------+   |
| | LoadingIndicatorComponent     |   |
| +-------------------------------+   |
| | ResultDisplayComponent        |   |
| | - Resultados calculados       |   |
| |                               |   |
| +-------------------------------+   |
| | ErrorNotificationComponent    |   |
| +-------------------------------+   |
| | HistoryComponent (Opcional)   |   |
| +-------------------------------+   |
|                  |                  |
+-------------------------------------+
|            FooterComponent          |
+-------------------------------------+
```

## Descrição dos Componentes

### Componentes Principais

1. **`HeaderComponent`**
   - **Descrição**: Apresenta o título da aplicação e links de navegação.

2. **`SidebarComponent`**
   - **Descrição**: Opcional, com links para diferentes cálculos e seções da aplicação.

3. **`SelectCalculationTypeComponent`**
   - **Descrição**: Permite a seleção do tipo de cálculo a ser realizado (ex.: pilar, viga, laje).

4. **`CalculationFormComponent`**
   - **Descrição**: Captura as entradas do usuário para os cálculos.
   - **Elementos filhos**:
     - `InputFieldsComponent`: Captura os campos específicos de entrada.
     - `SubmitButtonComponent`: Componente de envio de formulário.

5. **`ResultsComponent`**
   - **Descrição**: Exibe os resultados calculados.
   - **Elementos filhos**:
     - `ResultTableComponent`: Mostra os resultados em formato de tabela.
     - `GraphDisplayComponent`: Mostra os resultados em gráficos.

6. **`LoadingIndicatorComponent`**
   - **Descrição**: Exibe uma animação de carregamento durante as operações de backend.

7. **`ErrorNotificationComponent`**
   - **Descrição**: Mostra mensagens de erro caso ocorram falhas de requisição ou validação.

8. **`HistoryComponent`** (Opcional)
   - **Descrição**: Exibe o histórico de cálculos realizados pelo usuário.

9. **`FeedbackComponent`**
   - **Descrição**: Exibe mensagens de feedback de sucesso ou erro.

10. **`FooterComponent`**
    - **Descrição**: Contém informações adicionais, como links de contato e créditos.

## Serviços e Modelos

### Serviços
1. **ApiService**
   - **Função**: Gerencia as chamadas HTTP ao backend para envio e recebimento de dados.
2. **NotificationService**
   - **Função**: Centraliza a exibição de mensagens de feedback para o usuário.

### Modelos
- **`calc-data.model.ts`**: Interface de dados de entrada.
- **`result-data.model.ts`**: Interface de dados de saída.

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/lct-calculator.git
   cd lct-calculator
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   ng serve
   ```

4. **Verifique se o backend está configurado e em execução para prover os cálculos necessários.**

## Contribuições
Contribuições são bem-vindas! Envie pull requests ou relate problemas no repositório.

## Licença
Este projeto é licenciado sob a [LICENÇA QUE VOCÊ ESCOLHER].

```

Este README atualizado inclui a descrição dos componentes, a estrutura da árvore de pastas correta, e o wireframe em texto para visualização da interface do usuário.

+-------------------------------------+
|            HeaderComponent          |
+-------------------------------------+
| SidebarComponent | MainContent      |
|                  |                   |
| +-------------------------------+   |
| | SelectCalculationTypeComponent|   |
| +-------------------------------+   |
| |                               |   |
| | CalculationFormComponent      |   |
| | - Tipo de peça                |   |
| | - Largura (input)             |   |
| | - Altura (input)              |   |
| | - Carga (input)               |   |
| | - Botão Enviar                |   |
| |                               |   |
| +-------------------------------+   |
| | LoadingIndicatorComponent     |   |
| +-------------------------------+   |
| | ResultDisplayComponent        |   |
| | - Resultados calculados       |   |
| |                               |   |
| +-------------------------------+   |
| | ErrorNotificationComponent    |   |
| +-------------------------------+   |
| | FeedbackComponent             |   |
| +-------------------------------+   |
|                  |                   |
+-------------------------------------+
|            FooterComponent          |
+-------------------------------------+
