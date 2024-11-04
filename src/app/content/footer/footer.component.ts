import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  footerText: string = '© 2024 FEATURE CODE. Todos os direitos reservados.';
  companyText: string = 'Empresa LACET ARQUITETURA E ENGENHARIA';

  // Informações de contato
  email: string = 'contato@lacet.tech';
  telefoneMatriz: string = '(85) 9601-5923'; // Telefone da matriz
  telefoneFilial1: string = '(85) 99900-3739'; // Telefone da filial de Eusébio
  telefoneFilial2: string = '(83) 98626-1332'; // Telefone da filial de Campina Grande

  matriz = {
    endereco: 'R. Ary Barroso, 70, Sala 716 e 717 - Papicu, Fortaleza - CE',
    cep: '60175-705',
    telefone: this.telefoneMatriz,
  };

  filiais = [
    {
      endereco: 'Av. Pacífico, 731, Sala 603 - Cidade Alpha, Eusébio - CE',
      cep: '61.761-850',
      telefone: this.telefoneFilial1,
    },
    {
      endereco: 'Rua Treze de Maio, 31, Sala 03 - Centro, Campina Grande - PB',
      cep: '58400-290',
      telefone: this.telefoneFilial2,
    },
  ];

  // Links de redes sociais
  facebookLink: string = 'https://www.facebook.com/lacet.tech';
  instagramLink: string = 'https://www.instagram.com/lacet.tech/';
  linkedinLink: string = 'https://www.linkedin.com/company/lacet.tech/';
  whatsappLink: string = 'https://wa.me/558596015923';
}
