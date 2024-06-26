import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPerfilComponent } from './menu-perfil/menu-perfil.component';
import { BackendService } from '../../backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ MenuPerfilComponent, CommonModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  menuPerfilVisible: boolean = false;

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.username = this.backendService.getUsername();
      }
    });
  }

  btnPerfil() {
    if (this.isLoggedIn) {
      this.menuPerfilVisible = !this.menuPerfilVisible;
    } else {
      this.router.navigate(['/login']);
    }
  }

  btnCarrito() {
    this.router.navigate(['/carrito']);
  }

  btnPerfilUserRgistrado() {
    this.router.navigate(['/perfil']);
  }

  logout() {
    this.backendService.logout();
  }

  ngAfterViewInit(): void {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir?.addEventListener("click", () => {
      nav?.classList.add("visible");
    })

    cerrar?.addEventListener("click", () => {
      nav?.classList.remove("visible");
    })
  }
}
