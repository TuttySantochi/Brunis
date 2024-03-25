import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from '../../services/stock.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  woodList: Stock[] | undefined = [];
  ironWorkList: Stock[] | undefined = [];

  stockType: any = [
    { id: 1, name: "wood" },
    { id: 2, name: "ironWork" }]

  ironWorkType: any = [
    { id: 1, name: "bisagra" },
    { id: 2, name: "mensula" },
    { id: 3, name: "manija" },
    { id: 4, name: "tornillo" },
  ]

  woodType: any = [
    { id: 1, name: "prueba 1" },
    { id: 2, name: "prueba 2" },
    { id: 3, name: "prueba 3" }
  ]

  selectedOptions: any = []

  form: FormGroup;

  constructor(private stockServices: StockService) {
    this.form = new FormGroup({
      category: new FormControl(''),
      name: new FormControl(''),
      quantity: new FormControl(),
      dimensions: new FormControl(''),
    })
  }

  ngOnInit(): void {
    // this.getStock()
  }

  onSelect(type: any) {
    (<HTMLDivElement>document.getElementById("itemType")).style.display = "block"
    if (type.value === 'wood') {
      for (let i = 0; i < this.woodType.length; i++) {
        this.selectedOptions.push(this.woodType[i]);
      }
      return this.selectedOptions
    } else if (type.value === 'ironWork') {
      for (let i = 0; i < this.ironWorkType.length; i++) {
        this.selectedOptions.push(this.ironWorkType[i]);
      }
      return this.selectedOptions
    }
  }

  showDisplay() {
    (<HTMLDivElement>document.getElementById("itemQuantity")).style.display = "block";
    (<HTMLDivElement>document.getElementById("itemDimensions")).style.display = "block"
  }

  onSubmit() {
    const item = this.form.value;
    console.log(item);

    this.stockServices.addStock(item).subscribe()
    // this.clearForm()
    window.location.reload()
  }

  resetSelect() {
    this.selectedOptions = []
  }

  clearForm() {
    this.form.reset();
    this.resetSelect();
    (<HTMLDivElement>document.getElementById("itemType")).style.display = "none";
    (<HTMLDivElement>document.getElementById("itemQuantity")).style.display = "none";
    (<HTMLDivElement>document.getElementById("itemDimensions")).style.display = "none"
  }

}
