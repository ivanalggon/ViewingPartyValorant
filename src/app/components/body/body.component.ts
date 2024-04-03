import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReservasComponent } from './reservas/reservas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { NoticiasComponent } from './noticias/noticias.component';


@Component({
  selector: 'app-body',
  imports: [CommonModule, ReservasComponent, TiendaComponent, NoticiasComponent],
  standalone: true,
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

}