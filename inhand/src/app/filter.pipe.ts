import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(productList: any[], filterString: string, propertyname: any): any[] {
    const result: any = []

    if (!productList || filterString == '' || propertyname=='') {
      return productList
    }
    productList.forEach((product: any) => {
      if (product[propertyname].trim().toLowerCase().includes(filterString.toLowerCase())) {
        result.push(product)
      }
    })
    return result;
  }

}
