import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cards = [
    {nombre: 'May Toscano',
    tipo: 'Cocina',
    color: 'Grafito, Helsinki'},
    {nombre: 'Rosa Silberstein',
    tipo: 'Escritorio',
    color: 'Camelia, Grafito'},
    {nombre: 'Mariano Torres',
    tipo: 'Vinoteca',
    color: 'Lino Negro'},
    {nombre: 'Nadia Atenor',
    tipo: 'Rack TV',
    color: 'Blanco, Concreto'},
    {nombre: 'Nacho Arbeloa',
    tipo: 'Cama Montessori',
    color: 'Seda Giorno'}
  ]
 
}
