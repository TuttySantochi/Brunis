import { Component, Input } from '@angular/core';
import {Work} from '../../models/work'

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent {


  @Input() name: string;
  @Input() quantity: number;
  @Input() dimensions: string;

}
