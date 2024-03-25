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
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { PhotosComponent } from './views/photos/photos.component';
import { NotesComponent } from './views/notes/notes.component';
import { FormsModule } from '@angular/forms';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { WoodStockComponent } from './components/wood-stock/wood-stock.component';
import { IronWorkStockComponent } from './components/iron-work-stock/iron-work-stock.component';

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
    ContactSectionComponent,
    PhotosComponent,
    NotesComponent,
    AddNotesComponent,
    ClientCardComponent,
    WoodStockComponent,
    IronWorkStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
