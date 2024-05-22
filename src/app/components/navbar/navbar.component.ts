import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private searchService: SearchService){}

  isMenuCollapsed: boolean = true
  searchText: any

  searchInfo(){
    this.searchService.changeData(this.searchText)
  }


}
