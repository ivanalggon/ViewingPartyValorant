import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  providers: [],
  imports : [MenuComponent],
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  
  pulsacionesDelBoton:number = 0;

  unClic(){
    this.pulsacionesDelBoton++;
  }
}
