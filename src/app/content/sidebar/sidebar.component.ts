import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navItems = [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'input-form', label: 'Formulário de Cálculo', route: '/input-form' },
    { id: 'history', label: 'Histórico', route: '/history' },
  ];
}
