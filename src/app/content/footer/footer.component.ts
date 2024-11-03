import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  footerText: string = '© 2024 FEATURE CODE. Todos os direitos reservados.';
  companyText: string = 'Empresa LACET ARQUITETURA E ENGENHARIA';
}
