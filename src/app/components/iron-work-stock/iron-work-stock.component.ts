import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from '../../services/stock.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-iron-work-stock',
  templateUrl: './iron-work-stock.component.html',
  styleUrls: ['./iron-work-stock.component.scss']
})
export class IronWorkStockComponent implements OnInit {

  idValue: string;
  ironWorkList: Stock[] = [];
  allStock: Stock[] = [];

  @Input() searchText: string
  @Output() startSpinn = new EventEmitter();

  ironWorkType: any = [
    { id: 1, name: "bisagra" },
    { id: 2, name: "mensula" },
    { id: 3, name: "manija" },
    { id: 4, name: "tornillo" },
  ]

  form: FormGroup;

  constructor(private stockServices: StockService) {
    this.form = new FormGroup({
      category: new FormControl("0"),
      name: new FormControl("0"),
      quantity: new FormControl(0),
      dimensions: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.stockServices.getStocks().snapshotChanges().subscribe(
      response => {
        if (response) {
          response.forEach(element => {
            let item = element.payload.doc.data() as Stock
            item.id = element.payload.doc.id;
            this.allStock.push(item);
          });
          for (let i = 0; i < this.allStock.length; i++) {
            if (this.allStock[i].category === "Herraje") {
              this.ironWorkList.push(this.allStock[i])
            }
          }
        }
    }
  )
  }

  setvalues(id: string){    
    this.stockServices.getStock(id).valueChanges().subscribe(response => {        
      if (response) {
        this.idValue = id
          this.form.setValue({
            name: response.name,
            category: response.category,
            quantity: response.quantity,
            dimensions: response.dimensions
          })
      }  
    })
  }

  onSubmit(){
    this.startSpinn.emit()
    this.stockServices.updateStock(this.idValue, this.form.value)
    Swal.fire({
      icon: 'success',
      title: 'Item Editado!!',
      timer: 1500,
      showConfirmButton: false
    })
    setTimeout(() => {
      window.location.reload()    
    }, 1500);
  }

  selectItem(id: string){
    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar este Item?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.startSpinn.emit()
        this.deleteItem(id);
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'No se elimino el Item',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  deleteItem(id: string) {
    this.stockServices.deleteStock(id)
    .then(
      () => {
        Swal.fire({
          title:'Eliminado con exito', 
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.reload()
        }, 1500);
    });
  }

  clear(){
    this.form.reset()
    this.idValue = ''
  }

}
