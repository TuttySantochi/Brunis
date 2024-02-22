import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Output() notitaDesdeFooter = new EventEmitter<string>();
  
  notita: string = '';

  enviarNotita () {
    this.notitaDesdeFooter.emit(this.notita)
  }

}
