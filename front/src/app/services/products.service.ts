import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environnements/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  api = 'http://localhost:8080/Produits';
  constructor(private http: HttpClient) { }

  getAllProduct() {
    return this.http.get(environment.urlBackend)

  }

  getProductById(id: string) {
    return this.http.get(environment.urlBackend+'/Produit/'+id)
  }


  addProduct(produit:any){

    return this.http.post(environment.urlBackend+'/ajouterProduit',produit)

  }

  updateProduct(id:any,newproduit:any){

    return this.http.patch(environment.urlBackend+'/modifierProduit/'+id,newproduit)

  }
  deleteProduct(id:any){
    return this.http.delete(environment.urlBackend+'/supprimerProduit/'+id)

  }


}

