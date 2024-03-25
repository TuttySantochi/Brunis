import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-wood-stock',
  templateUrl: './wood-stock.component.html',
  styleUrls: ['./wood-stock.component.scss']
})
export class WoodStockComponent implements OnInit {

  woodList?: Stock[] = [];

  constructor(private stockServices: StockService) { }

  ngOnInit(): void {
    this.getStock()
  }

  getStock(): void {
    this.stockServices.getStocks().subscribe({
      next: response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].category === "wood") {
            this.woodList?.push(response[i])
          }
        }
      }
    })
  }

}
