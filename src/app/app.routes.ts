import { Routes } from '@angular/router';
import { BodyComponent } from './pages/home/body.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent },
    { path: 'noticias', component: NoticiasComponent },
    { path: 'reservas', component: ReservasComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'login', component: LoginComponent }

];