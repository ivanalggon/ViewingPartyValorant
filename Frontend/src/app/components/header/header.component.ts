import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  providers: [],
  imports : [],
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
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

  cambiarColor(color: string): void {
    this.header.classList.remove('negro', 'gris');
    this.header.classList.add(color);
  }

  private get header(): HTMLElement {
    return document.querySelector('.header') as HTMLElement;
  }
}
