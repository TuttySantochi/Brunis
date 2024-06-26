import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Output() startSpinn = new EventEmitter()

  startSpinner(){
    this.startSpinn.emit()
  }
}
