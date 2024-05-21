import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReservasComponent } from '../reservas/reservas.component';
import { TiendaComponent } from '../tienda/tienda.component';
import { NoticiasDestacadasComponent } from '../../components/noticias-destacadas/noticiasdestacadas.component';
import { sliderImgComponent } from '../../components/sliderImg/sliderImg.component';
import { ContactoComponent} from '../contacto/contacto.component';
import { PartnersSliderComponent } from '../../components/partners-slider/partners-slider.component';

@Component({
  selector: 'app-body',
  imports: [CommonModule, ReservasComponent, TiendaComponent, NoticiasDestacadasComponent,sliderImgComponent, ContactoComponent, PartnersSliderComponent],
  standalone: true,
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

}