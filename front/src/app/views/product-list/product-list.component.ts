import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  dataArray:any=[]
    dataProduct = {
    nom: '',
    prixUnitaire: '',
    quantite: '',
    id: '',
  };
  messageSuccess = '';
  searchQuery = ''; // Add the search query variable

  constructor(private ps: ProductsService) {
    this.ps.getAllProduct().subscribe((data) => {
      this.dataArray = data;
    });
  }

  deleteProduct(id: any, i: any) {
    this.ps.deleteProduct(id).subscribe((response: any) => {
      this.dataArray.splice(i, 1);
    });
  }

  getdata(nom: string, prixUnitaire: string, quantite: string, id: string) {
    this.messageSuccess = '';
    this.dataProduct.nom = nom;
    this.dataProduct.prixUnitaire = prixUnitaire;
    this.dataProduct.quantite = quantite;
    this.dataProduct.id = id;
  }

  updateNewProduct(f: any) {
    let data = f.value;
    this.ps.updateProduct(this.dataProduct.id, data).subscribe(
      (response: any) => {
        let indexId = this.dataArray.findIndex((obj: any) => obj.id == this.dataProduct.id);
        this.dataArray[indexId].nom = data.nom;
        this.dataArray[indexId].prixUnitaire = data.prixUnitaire;
        this.dataArray[indexId].quantite = data.quantite;
        this.messageSuccess = `La modification est terminée avec succès`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  // Function to filter the dataArray based on the search query
  applySearch() {
    if (this.searchQuery) {
      // If the search query is not empty
      const query = this.searchQuery.toLowerCase();
      this.dataArray = this.dataArray.filter((item: { nom: string; }) =>
        item.nom.toLowerCase().includes(query)
      );
    } else {
      // If the search query is empty, show all data
      this.ps.getAllProduct().subscribe((data) => {
        this.dataArray = data;
      });
    }
  }
}
