import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
totalItem=0
  constructor(private router: Router,private service:ServicesService) { }

  ngOnInit(): void {
    this.service.getProduct()
    .subscribe((data)=>{
      this.totalItem=data.length
    })
  }

search(event:any){
  let searchValue=event.target.value
  this.service.searchTerm.next(searchValue)
console.log(searchValue);
}

  logout() {
    // we have to remove existing user details from local storage
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("currentName")

    // we have to redirect to login page
    this.router.navigateByUrl('')
  }
}
