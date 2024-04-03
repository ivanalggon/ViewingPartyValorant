import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from './producto.interface';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, TiendaComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit{
  productos: Producto[] = [
    {
      nombre: "Figura Jett de Valorant",
      descripcion: "Descripción breve del producto 1",
      precio: 189.99,
      imagen: "../assets/jett-figura.jpg"
    },
    {
      nombre: "Figura Phoenix de Valorant",
      descripcion: "Descripción breve del producto 2",
      precio: 189.99,
      imagen: "../assets/phoenix-figura.jpg"
    },
    {
      nombre: "Camiseta de Valorant",
      descripcion: "Descripción breve del producto 3",
      precio: 33.33,
      imagen: "../assets/camiseta-valorant.jpg"
    },
    {
      nombre: "Sudadera de Valorant",
      descripcion: "Descripción breve del producto 4",
      precio: 15.99,
      imagen: "../assets/sudadera-valorant.jpg"
    },
    {
      nombre: "Chaqueta Cazadora de Valorant",
      descripcion: "Descripción breve del producto 5",
      precio: 24.99,
      imagen: "../assets/chaqueta-valorant.jpg"
    },
    {
      nombre: "Jersey de Valorant",
      descripcion: "Descripción breve del producto 6",
      precio: 9.99,
      imagen: "../assets/jersey-valorant.jpg"
    }
  ];

  constructor() { }

  ngOnInit(): void {  }

  getProductos(): Producto[] {
    return this.productos;
  }
}


