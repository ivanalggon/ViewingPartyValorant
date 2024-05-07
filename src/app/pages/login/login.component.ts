import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const signUpButton = this.el.nativeElement.querySelector('#signUp');
    const signInButton = this.el.nativeElement.querySelector('#signIn');
    const container = this.el.nativeElement.querySelector('#container');

    this.renderer.listen(signUpButton, 'click', (event) => {
      this.renderer.addClass(container, 'right-panel-active');
    });

    this.renderer.listen(signInButton, 'click', (event) => {
      this.renderer.removeClass(container, 'right-panel-active');
    });
  }
}