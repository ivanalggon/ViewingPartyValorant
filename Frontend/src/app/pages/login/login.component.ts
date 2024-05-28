import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from '../../backend.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  formRegister: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private backendService: BackendService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      emailLogin: ['', Validators.required],
      passwordLogin: ['', Validators.required]
    });

    this.formRegister = this.fb.group({
      emailRegister: ['', Validators.required],
      passwordRegister: ['', Validators.required],
      nameRegister: ['', Validators.required],
      surnameRegister: ['', Validators.required],
      usernameRegister: ['', Validators.required]
    });
  }

  activateRightPanel() {
    const container = this.el.nativeElement.querySelector('#container');
    this.renderer.addClass(container, 'right-panel-active');
  }

  deactivateRightPanel() {
    const container = this.el.nativeElement.querySelector('#container');
    this.renderer.removeClass(container, 'right-panel-active');
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const { emailLogin, passwordLogin } = this.formLogin.value;
      console.log('Form values:', emailLogin, passwordLogin);
      this.backendService.getLogin(emailLogin, passwordLogin).subscribe(
        (users) => {
          console.log('Response from login service:', users);
          if (users.length > 0) {
            localStorage.setItem('username', users[0].username);
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
          }
        },
        (error) => {
          console.log('Error during login request:', error);
          this.errorMessage = 'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
        }
      );
    }
  }

  onRegister() {
    if (this.formRegister.valid) {
      const { nameRegister, surnameRegister, usernameRegister, emailRegister, passwordRegister } = this.formRegister.value;
      console.log('Register form values:', nameRegister, surnameRegister, usernameRegister, emailRegister, passwordRegister);
      this.backendService.register(nameRegister, surnameRegister, usernameRegister, emailRegister, passwordRegister).subscribe(
        (response) => {
          console.log('Response from registration service:', response);
          if (response && response.username) {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Error en el registro. Por favor, verifica tus datos.';
          }
        },
        (error) => {
          console.log('Error during registration request:', error);
          this.errorMessage = 'Error en el registro. Por favor, verifica tus datos.';
        }
      );
      window.location.reload();
    }
  }
}