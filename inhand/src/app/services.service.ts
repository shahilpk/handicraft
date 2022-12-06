import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
// import { isNgTemplate } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
cartItemList=new BehaviorSubject([])
cartItemListArray:any=[]

  // public productList=new BehaviorSubject<any>([])

searchTerm=new BehaviorSubject("")

  constructor(private api:HttpClient,) { }
  getProducts(){
    return this.api.get('http://localhost:3000/productsAll')
    
  }
  login(username:any,password:any){
const body={
  username,
  password
}
return this.api.post('http://localhost:3000/login', body)
  }

  register(username:any,name:any,email:any,password:any){
const body={
  username,
  name,
  email,
  password
}
return this.api.post('http://localhost:3000/register', body)
  }
  
  // add to cart
  getProduct(){
  return this.cartItemList.asObservable()
  }
  setProduct(product:any){
    this.cartItemListArray.push(product)
    this.cartItemList.next(product)
  }
  addToCart(product:any){
    this.cartItemListArray.push(product)
    this.cartItemList.next(this.cartItemListArray)
    this.getttotalPrice()
  }

  getttotalPrice(){
    let grandTotal=0
    this.cartItemListArray.map((item:any)=>{
      grandTotal+=item.price

    })
    return grandTotal
  }
  
  removeItemCart(product:any){
    this.cartItemListArray.map((item:any,index:any)=>{
      if (product.id==item.id) {
        this.cartItemListArray.splice(index,1)
      }
    })
    this.cartItemList.next(this.cartItemListArray)
  }


  // removeAllItem(){
  //   this.cartItemListArray=[]
  //   this.cartItemList.next(this.cartItemListArray)
  // }


}


