import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  // Método para obtener todos los usuarios desde el backend
  getUsers(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/users');
  }

  // Método para obtener todos los productos desde el backend
  getProducts(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/products');
  }

  // Método para obtener todos los eventos desde el backend
  getEvents(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/events');
  }
}
