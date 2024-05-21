import { Component } from '@angular/core';
import { NoticiasDestacadasComponent } from '../../components/noticias-destacadas/noticiasdestacadas.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [NoticiasDestacadasComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

}
