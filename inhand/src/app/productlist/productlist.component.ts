import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  productList:any
  search:any
  constructor(private restapi:ServicesService) { }

  ngOnInit(): void {
    this.restapi.getProducts()
    .subscribe((result:any)=>{
      console.log(result);
     this.productList=result.products
     
     this.productList.forEach((item:any) => {
      Object.assign(item,{quantity:1,total:item.price})
    });
    })
  
    this.restapi.searchTerm.subscribe((data)=>{
      this.search=data
    })
  }

  addToCart(product: any) {
    this.restapi.addToCart(product)
  }
}
