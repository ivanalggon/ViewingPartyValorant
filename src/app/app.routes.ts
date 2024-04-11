import { Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { NoticiasComponent } from './components/body/noticias/noticias.component';
import { TiendaComponent } from './components/body/tienda/tienda.component';
import { ReservasComponent } from './components/body/reservas/reservas.component';

export const routes: Routes = [
    { path: 'noticias', component: NoticiasComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'reservas', component: ReservasComponent }
];