import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title: string = 'LCT - Calculator';
  subtitle: string = 'Cálculo Completo de Fundações';

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/home/${route}`]); // Ajuste para incluir a rota pai 'home'
  }
}
