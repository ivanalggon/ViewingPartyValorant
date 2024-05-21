import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Noticia } from './noticiasdestacadas.interface';
import { Evento } from './evento.interface';
import { DataValorant } from './datavalorant.interface';

@Component({
  selector: 'app-noticiasdestacadas',
  standalone: true,
  imports: [CommonModule, NoticiasDestacadasComponent],
  templateUrl: './noticiasdestacadas.component.html',
  styleUrl: './noticiasdestacadas.component.css'
})
export class NoticiasDestacadasComponent{
  noticiasUltimas: Noticia[] = [
    {
      titulo: "Nuevo parche Valorant trae cambios al mapa Breeze",
      enlace: "https://www.valorantgame.com/news/valorant-patch-notes-6-0"
    },
    {
      titulo: "Pruebas del nuevo agente KAY/O ya disponibles",
      enlace: "https://playvalorant.com/es-es/news/agent-kay-o-valorant/"
    }
  ];
  
  eventosProximos: Evento[] = [
    {
      fecha: "15 de marzo de 2024",
      nombre: "Valorant Champions Tour Masters Reykjavík"
    },
    {
      fecha: "22 de abril de 2024",
      nombre: "Valorant Champions Tour Stage 2 Challengers Finals"
    }
  ];
  
  datosValorant: DataValorant[] = [
    {
      nombre: "Desarrollador",
      descripcion: "Riot Games"
    },
    {
      nombre: "Fecha de lanzamiento",
      descripcion: "2 de junio de 2020"
    },
    {
      nombre: "Género",
      descripcion: "Shooter táctico en primera persona"
    },
    {
      nombre: "Plataformas",
      descripcion: "PC"
    }
  ];
}



