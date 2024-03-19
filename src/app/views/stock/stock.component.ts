import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from '../../services/stock.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  woodList: Stock[] | undefined = [];
  ironWorkList: Stock[] | undefined = [];

  constructor(private stockServices: StockService){}

  ngOnInit(): void {
    this.stockServices.getStocks().subscribe({
      next: response => {
        console.log(response);
                
        for (let i = 0; i < response.length; i++) {
          if (response[i].category === "wood"){
            this.woodList?.push(response[i])
        }else if(response[i].category === "ironWork"){
          this.ironWorkList?.push(response[i])
      }      
    }}
    })
  }

}
