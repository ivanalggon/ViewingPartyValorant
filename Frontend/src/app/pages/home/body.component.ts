import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReservasComponent } from '../reservas/reservas.component';
import { TiendaComponent } from '../tienda/tienda.component';
import { NoticiasComponent } from '../noticias/noticias.component';
import { sliderImgComponent } from '../../components/sliderImg/sliderImg.component';
import { ContactoComponent} from '../contacto/contacto.component';

@Component({
  selector: 'app-body',
  imports: [CommonModule, ReservasComponent, TiendaComponent, NoticiasComponent,sliderImgComponent, ContactoComponent],
  standalone: true,
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

}