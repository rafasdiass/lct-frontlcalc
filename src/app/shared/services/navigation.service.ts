import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  // Navega para uma rota específica
  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  // Navega para uma seção específica se já estiver na página 'home'
  navigateToSection(sectionId: string): void {
    const isHomeRoute = this.router.url === '/' || this.router.url === '/home';

    if (isHomeRoute) {
      this.scrollToSection(sectionId);
    } else {
      this.router.navigate(['/home']).then(() => {
        this.scrollToSection(sectionId);
      });
    }
  }

  // Função auxiliar para rolar até a seção desejada
  private scrollToSection(sectionId: string): void {
    // Adiciona um pequeno atraso para garantir que o elemento exista no DOM
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }
}
