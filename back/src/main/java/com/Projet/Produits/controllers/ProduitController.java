package com.Projet.Produits.controllers;

import com.Projet.Produits.entities.Produit;
import com.Projet.Produits.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/Produits")
@AllArgsConstructor
public class ProduitController{

    private final ProductService productService;

    @GetMapping("")
    public List<Produit> getData(){return productService.getAllProduct();}

    @PostMapping("/ajouterProduit")
    public Produit add(@RequestBody Produit product){return productService.addProduct( product);}

    @GetMapping("/Produit/{id}")
    public Optional<Produit> getOneProduct(@PathVariable Long id){return productService.getProductById( id);}

    @DeleteMapping("/supprimerProduit/{id}")
    public String deleteProduct(@PathVariable Long id) {return productService.deleteProduct(id);}


    @PatchMapping("/modifierProduit/{id}")
    public Produit updateNewPatient(@PathVariable Long id, @RequestBody Produit newproduct){
        return productService.modifyProduct(id, newproduct);
    }


}