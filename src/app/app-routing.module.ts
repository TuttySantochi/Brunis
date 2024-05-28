import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ClientComponent } from './views/client/client.component';
import { ContactComponent } from './views/contact/contact.component';
import { StockComponent } from './views/stock/stock.component';
import { PhotosComponent } from './views/photos/photos.component';
import { NotesComponent } from './views/notes/notes.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '',  component: HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'login', component: LoginComponent },
  { path: 'photos', component: PhotosComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'notes', component: NotesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'client/:id', component: ClientComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'contact', component: ContactComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'stock', component: StockComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: '**', component: HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    bindToComponentInputs: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
