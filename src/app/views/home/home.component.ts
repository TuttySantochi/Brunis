import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  nombre: string = 'Juan Perez';
  tipo: string = 'Bajo Mesada';
  color: string = 'Camelia';
}
