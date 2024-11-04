import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NavbarService } from '../../shared/services/navbar.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    CommonModule,
    RouterOutlet,
  ],
  standalone: true,
})
export class HomeComponent {
  constructor(private navbarService: NavbarService) {}

  get isSidebarVisible(): boolean {
    return this.navbarService.isNavbarOpen; // Obtenha o estado de visibilidade do sidebar
  }

  toggleSidebar(): void {
    this.navbarService.toggleNavbar(); // Alterna a visibilidade do sidebar
  }
}
