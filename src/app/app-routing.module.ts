import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ClientComponent } from './views/client/client.component';
import { ContactComponent } from './views/contact/contact.component';
import { StockComponent } from './views/stock/stock.component';
import { PhotosComponent } from './views/photos/photos.component';
import { NotesComponent } from './views/notes/notes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'client/:id', component: ClientComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'stock', component: StockComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    bindToComponentInputs: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
