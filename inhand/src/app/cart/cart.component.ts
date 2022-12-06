import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product :any= []
  totalPrice=0
  
  constructor(private service:ServicesService,private router:Router) { }
totalItem=0
total=0
  ngOnInit(): void {
    this.service.getProduct().subscribe((data) => {
      this.product = data

    })

    this.totalPrice=this.service.getttotalPrice()

    this.service.getProduct()
    .subscribe((data)=>{
      this.totalItem=data.length
    })

    
  }
  removeItemCart(item:any){
    this.service.removeItemCart(item)
    this.totalPrice=this.service.getttotalPrice()
  }

  logout() {
    // we have to remove existing user details from local storage
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("currentName")

    // we have to redirect to login page
    this.router.navigateByUrl('')

  }
// alert

  clicked(){
    // alert("successfull")
    Swal.fire("Order Palced Successfully",'Thank you','success')
  }
}
