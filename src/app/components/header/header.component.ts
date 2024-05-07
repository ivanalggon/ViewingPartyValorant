import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  providers: [],
  imports : [MenuComponent],
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  btnPerfil() {
    this.router.navigate(['/login']);
  }
}
