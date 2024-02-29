import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  cards = [
    {
      nombre: 'May Toscano',
      tipo: 'Cocina',
      color: 'Grafito, Helsinki',
      imagen: 'assets/MayToscano.jpeg',
    },
    {
      nombre: 'Rosa Silberstein',
      tipo: 'Escritorio',
      color: 'Camelia, Grafito',
      imagen: 'assets/RositaSilberstein.jpeg',
    },
    {
      nombre: 'Mariano Torres',
      tipo: 'Vinoteca',
      color: 'Lino Negro',
      imagen: 'assets/MarianoTorres.jpg',
    },
    {
      nombre: 'Nadia Atenor',
      tipo: 'Rack TV',
      color: 'Blanco, Concreto',
      imagen: 'assets/NadiaAtenor.jpeg',
    },
    {
      nombre: 'Nacho Arbeloa',
      tipo: 'Cama Montessori',
      color: 'Seda Giorno',
      imagen: 'assets/NachoArbeloa.jpeg',
    },
  ];
}
