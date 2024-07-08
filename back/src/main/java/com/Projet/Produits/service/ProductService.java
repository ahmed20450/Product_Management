package com.Projet.Produits.service;

import com.Projet.Produits.entities.Produit;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Produit> getAllProduct();
    Optional<Produit> getProductById(Long id);
    Produit addProduct(Produit product);
    Produit modifyProduct(Long id, Produit newproduct);
    String deleteProduct(Long id);
}