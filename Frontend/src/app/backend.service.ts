import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private username: string = '';

  constructor(private httpClient: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('username');
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/users');
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/products');
  }

  getEvents(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/events');
  }

  getLogin(emailLogin: string, passwordLogin: string): Observable<any> {
    console.log(`Making request to: http://localhost:3000/api/users?email=${emailLogin}&password=${passwordLogin}`);
    return this.httpClient.get<any>(`http://localhost:3000/api/users?email=${emailLogin}&password=${passwordLogin}`)
      .pipe(
        map(response => response.users),
        tap(users => {
          console.log('Users from API:', users);
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('username', user.username);
            this.isLoggedInSubject.next(true);
            this.username = user.username;
          }
        })
      );
  }

  register(nameRegister: string, surnameRegister: string, usernameRegister: string, emailRegister: string, passwordRegister: string): Observable<any> {
    const url = 'http://localhost:3000/api/users';
    const body = { name: nameRegister, surname: surnameRegister, username: usernameRegister, email: emailRegister, password: passwordRegister };
    console.log(`Sending registration request to: ${url} with body:`, body);
    return this.httpClient.post<any>(url, body).pipe(
      tap(response => {
        console.log('Response from registration API:', response);
        if (response && response.username) {
          localStorage.setItem('username', response.username);
          this.isLoggedInSubject.next(true);
          this.username = response.username;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUsername(): string {
    return this.username || localStorage.getItem('username') || '';
  }

  logout(): void {
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
  }
}