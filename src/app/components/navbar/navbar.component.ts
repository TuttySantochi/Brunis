import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import {LoginService} from '../../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private searchService: SearchService,
              private loginService: LoginService,
              private router: Router
  ){}

  isMenuCollapsed: boolean = true
  searchText: any

  searchInfo(){
    this.searchService.changeData(this.searchText)
  }

  logout(){
    this.loginService.logout()
    .then(()=>{
      this.router.navigate(['/login'])
    })
    .catch(error => console.log(error))
  }
}
