import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from '../../services/stock.service';


@Component({
  selector: 'app-iron-work-stock',
  templateUrl: './iron-work-stock.component.html',
  styleUrls: ['./iron-work-stock.component.scss']
})
export class IronWorkStockComponent implements OnInit {

  ironWorkList?: Stock[] = [];

  constructor(private stockServices: StockService) { }

  ngOnInit(): void {
    this.getStock()
  }

  getStock(): void {
    this.stockServices.getStocks().subscribe({
      next: response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].category === "ironWork") {
            this.ironWorkList?.push(response[i])
          }
        }
      }
    })
  }

}
