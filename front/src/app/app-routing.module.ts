import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './views/product-create/product-create.component';
import { ProductListComponent } from './views/product-list/product-list.component';

const routes: Routes = [
  {path:'Produits',component:ProductListComponent},
  {path:'Produits/ajouterProduit',component:ProductCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
