import { Component,  ElementRef, Renderer2 } from '@angular/core';

import {
  FormGroup, ReactiveFormsModule, Validators, FormBuilder
}from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  formLogin: FormGroup;
  formRegister: FormGroup;
  constructor(private fb: FormBuilder, private el: ElementRef, private renderer: Renderer2) { 
    this.formLogin = this.fb.group({
      emailLogin: ['', Validators.required],
      passwordLogin: ['', Validators.required]
    });

    this.formRegister = this.fb.group({
      emailRegister: ['', Validators.required],
      passwordRegister: ['', Validators.required],
      nameRegister: ['', Validators.required]
    });

    

  }

  activateRightPanel() {
    const container = this.el.nativeElement.querySelector('#container');
    this.renderer.addClass(container, 'right-panel-active');
  };

  // Método para remover la clase 'right-panel-active'
  deactivateRightPanel() {
    const container = this.el.nativeElement.querySelector('#container');
    this.renderer.removeClass(container, 'right-panel-active');
  }

  onSubmit(){
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
    }
    if(this.formRegister.valid){
      console.log(this.formRegister.value);
    }
  }
 
}