import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent {

  @Input()  name: string;
  @Input()  phone: number;
  @Input()  location: string;
  @Input()  calification: number;


}
