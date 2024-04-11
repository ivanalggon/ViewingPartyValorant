import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { NoticiasComponent } from './components/body/noticias/noticias.component';
import { TiendaComponent } from './components/body/tienda/tienda.component';
import { ReservasComponent } from './components/body/reservas/reservas.component';

const routes: Routes = [
    { path: '', component: BodyComponent }, // Ruta por defecto
    { path: 'noticias', component: NoticiasComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'reservas', component: ReservasComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }