import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  providers: [],
  imports : [MenuComponent],
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
  }

  cambiarColor(color: string): void {
    this.header.classList.remove('negro', 'gris');
    this.header.classList.add(color);
    
  }

  private get header(): HTMLElement {
    return document.querySelector('.header') as HTMLElement;
  }
}
