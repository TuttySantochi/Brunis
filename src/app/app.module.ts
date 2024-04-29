import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './views/home/home.component';
import { ClientComponent } from './views/client/client.component';
import { ContactComponent } from './views/contact/contact.component';
import { StockComponent } from './views/stock/stock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotosComponent } from './views/photos/photos.component';
import { NotesComponent } from './views/notes/notes.component';
import { FormsModule } from '@angular/forms';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WoodStockComponent } from './components/wood-stock/wood-stock.component';
import { IronWorkStockComponent } from './components/iron-work-stock/iron-work-stock.component';
import { ClientsContactComponent } from './components/clients-contact/clients-contact.component';
import { ProviderContactComponent } from './components/provider-contact/provider-contact.component';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireStorageModule}  from '@angular/fire/compat/storage'
import {environment} from '../environments/environment'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    HomeComponent,
    ClientComponent,
    ContactComponent,
    StockComponent,
    PhotosComponent,
    NotesComponent,
    AddNotesComponent,
    WoodStockComponent,
    IronWorkStockComponent,
    ClientsContactComponent,
    ProviderContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
