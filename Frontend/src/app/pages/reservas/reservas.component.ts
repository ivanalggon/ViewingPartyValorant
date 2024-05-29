import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from './reservas.interface';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, ReservasComponent],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  ngOnInit() {
    this.reservas = [
      {
        imagen: '../assets/img/koi-giants.jpg', 
        titulo: 'KOI vs Giants Gaming',
        fecha: '10 de Marzo, 2024',
        hora: '18:00 - 21:00',
        ubicacion: 'Barcelona'
      },{
        imagen: '../assets/img/kru-giants.jpg',
        titulo: 'KRU Esports vs Giants Gaming',
        fecha: '10 de Marzo, 2024',
        hora: '18:00 - 21:00',
        ubicacion: 'Barcelona'
      },{
        imagen: '../assets/img/case-kpi.jpg',
        titulo: 'Case Esports vs KPI Gaming',
        fecha: '10 de Marzo, 2024',
        hora: '18:00 - 21:00',
        ubicacion: 'Barcelona'
      },{
        imagen: '../assets/img/case-kpi.jpg',
        titulo: 'Case Esports vs KPI Gaming',
        fecha: '10 de Marzo, 2024',
        hora: '18:00 - 21:00',
        ubicacion: 'Madrid'
      },{
        imagen: '../assets/img/koi-giants.jpg', 
        titulo: 'KOI vs Giants Gaming',
        fecha: '10 de Marzo, 2024',
        hora: '18:00 - 21:00',
        ubicacion: 'Madrid'
      },{
        imagen: '../assets/img/kru-giants.jpg',
        titulo: 'KRU Esports vs Giants Gaming',
        fecha: '10 de Marzo, 2024',
        hora: '18:00 - 21:00',
        ubicacion: 'Madrid'
      },
    ];
  }
}