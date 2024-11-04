import { Component, HostListener } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SidebarComponent {
  navItems = [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'input-form', label: 'Formulário de Cálculo', route: '/input-form' },
    { id: 'history', label: 'Histórico', route: '/history' },
  ];

  get isNavbarOpen(): boolean {
    return this.navbarService.isNavbarOpen;
  }

  constructor(
    private navbarService: NavbarService,
    private navigationService: NavigationService
  ) {}

  toggleNavbar(): void {
    this.navbarService.toggleNavbar();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.navbarService.closeNavbar();
    } else if (target.closest('.nav-link')) {
      this.navbarService.closeNavbar();
    }
  }

  navigate(route: string): void {
    this.navigationService.navigateToRoute(route);
    this.navbarService.closeNavbar(); // Fecha o menu após a navegação
  }
}
