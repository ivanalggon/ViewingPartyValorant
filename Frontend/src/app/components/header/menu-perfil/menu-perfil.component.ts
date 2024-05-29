import { Component } from '@angular/core';
import { BackendService } from '../../../backend.service';

@Component({
  selector: 'app-menu-perfil',
  standalone: true,
  imports: [],
  templateUrl: './menu-perfil.component.html',
  styleUrl: './menu-perfil.component.css'
})
export class MenuPerfilComponent {
  constructor(private backendService: BackendService) {} 
  
  //metodo pa cerrar sesion
  logout(): void {
    this.backendService.logout(); // Llama al método logout del servicio BackendService
  }
}
