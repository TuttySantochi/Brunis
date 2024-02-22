import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  notitaNueva: string = '';

  recibirNotita (notita: string){
    this.notitaNueva = notita
  }
}
