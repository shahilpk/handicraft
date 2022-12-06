import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
totalItem=0
  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit(): void {
    this.service.getProduct()
    .subscribe((data)=>{
      this.totalItem=data.length
    })
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
