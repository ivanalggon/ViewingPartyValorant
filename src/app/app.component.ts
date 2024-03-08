import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { products } from './interfaces/products';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'newTest';

  name: string = 'Iván Sebastián Alguacil González';

  frutas: products[] = [
    {
      name: 'manzana',
      price: 30
    },{
      name: 'pera',
      price: 50
    },{
      name: 'plátano',
      price: 15
    }
  ];

}
