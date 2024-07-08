import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  messageErr=""


  constructor(private ps:ProductsService,private route:Router){}



  add(f:any){
    let data=f.value
    // console.log(data)
    this.ps.addProduct(data).subscribe((response: any)=>{
      console.log(response)
      this.route.navigate(['/Produits'])

    },(err:HttpErrorResponse)=>{
      this.messageErr=err.error
      //
      // console.log(err.status)
    })
  }

}
