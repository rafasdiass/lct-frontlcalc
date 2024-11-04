import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  isNavbarOpen: boolean = false;

  constructor() {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    this.updateNavbarClass();
  }

  closeNavbar() {
    this.isNavbarOpen = false;
    this.updateNavbarClass();
  }

  private updateNavbarClass() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      if (this.isNavbarOpen) {
        navbarCollapse.classList.add('show');
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  }
}
