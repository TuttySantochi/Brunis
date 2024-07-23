import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import {StockCategoryService} from '../../services/stock-category.service'
import {StockCategory} from '../../models/stockCategory'
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  isLoading: boolean = false
  searchText: string
  newItemType: string = ''
  ironWorkType: any = []
  woodType: any = []
  selectedOptions: any = []
  categories: any = []
  typeCategory: string = ''
  form: FormGroup;

  stockType: any = [
    { id: 1, name: "Madera" },
    { id: 2, name: "Herraje" }]



  constructor(private stockServices: StockService, 
    private searchService: SearchService,
  private stockCategoryService: StockCategoryService) {
    this.form = new FormGroup({
      category: new FormControl("0"),
      name: new FormControl("0"),
      quantity: new FormControl(0),
      dimensions: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.searchService.currentData.subscribe(data=>{
      this.searchText = data
    })
    this.stockCategoryService.getStocks().snapshotChanges().subscribe(
      data =>{
        data.forEach(item => {
          let itemCategory = item.payload.doc.data() as StockCategory
          itemCategory.id = item.payload.doc.id
          if (itemCategory.type === 'Madera') {
            this.woodType.push(itemCategory)
          } else if (itemCategory.type === 'Herraje') {
            this.ironWorkType.push(itemCategory)
          }
        })
    })
  }

  onSelect(type: any) {
    (<HTMLDivElement>document.getElementById("divItemType")).style.display = "block";
    (<HTMLDivElement>document.getElementById("newItemButton")).style.display = "block";
    console.log(type.value);
    
    if (type.value === 'Madera') {
      console.log(type.value);
      this.typeCategory = type.value
      this.selectedOptions = this.woodType
      // for (let i = 0; i < this.woodType.length; i++) {
      //   this.selectedOptions.push(this.woodType[i]);
      // }
      // return this.selectedOptions
    } else {
      console.log(type.value);
      this.typeCategory = type.value
      this.selectedOptions = this.ironWorkType
      // for (let i = 0; i < this.ironWorkType.length; i++) {
      //   this.selectedOptions.push(this.ironWorkType[i]);
      // }
      // return this.selectedOptions
    }
  }

  showDisplay() {
    (<HTMLDivElement>document.getElementById("divItemQuantity")).style.display = "block";
    (<HTMLDivElement>document.getElementById("divItemDimensions")).style.display = "block";
  }

  onSubmit() {
    this.isLoading = true
    this.stockServices.addStock(this.form.value)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  resetSelect() {
    this.selectedOptions = []
  }

  clearForm() {
    this.form.setValue({category: "0", name: "0", quantity: 0, dimensions: 0})
    this.resetSelect();
    (<HTMLDivElement>document.getElementById("divItemType")).style.display = "none";
    (<HTMLDivElement>document.getElementById("divItemQuantity")).style.display = "none";
    (<HTMLDivElement>document.getElementById("divItemDimensions")).style.display = "none";
    (<HTMLDivElement>document.getElementById("newItemDiv")).style.display = "none";
    (<HTMLDivElement>document.getElementById("backButton")).style.display = "none";
    (<HTMLDivElement>document.getElementById("newItemButton")).style.display = "none";
  }

  startSpinner(){
    this.isLoading = true
}

generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)


showInput(){
  (<HTMLDivElement>document.getElementById("divItemType")).style.display = "none";
  (<HTMLDivElement>document.getElementById("newItemDiv")).style.display = "block";
  (<HTMLDivElement>document.getElementById("newItemButton")).style.display = "none";
  (<HTMLDivElement>document.getElementById("backButton")).style.display = "block"
}

sendNewItem(){
  let name = this.newItemType
  let id = this.generateId()
  let type = this.typeCategory
  let item = {name, id, type}
  this.stockCategoryService.addStock(item)
  this.newItemType = ''
  this.typeCategory = ''
}

backToSelect() {
  (<HTMLDivElement>document.getElementById("divItemType")).style.display = "block";
  (<HTMLDivElement>document.getElementById("newItemDiv")).style.display = "none";
  (<HTMLDivElement>document.getElementById("newItemButton")).style.display = "block";
  (<HTMLDivElement>document.getElementById("backButton")).style.display = "none"
}

}
