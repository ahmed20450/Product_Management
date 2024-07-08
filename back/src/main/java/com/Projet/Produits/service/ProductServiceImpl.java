package com.Projet.Produits.service;

import com.Projet.Produits.entities.Produit;
import com.Projet.Produits.repositories.ProduitRepository;



import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{

    @Autowired
    private final ProduitRepository produitRepository;

    @Override
    public List<Produit> getAllProduct(){return produitRepository.findAll();};


    @Override
    public Optional<Produit> getProductById(Long id){return produitRepository.findById(id);};


    @Override
    public Produit addProduct(Produit product){return produitRepository.save(product);};


    @Override
    public Produit modifyProduct(Long id, Produit newproduct){
        return produitRepository.findById(id).map(
                p -> {
                    p.setNom(newproduct.getNom());
                    p.setPrixUnitaire(newproduct.getPrixUnitaire());
                    p.setQuantite(newproduct.getQuantite());
                    return produitRepository.save(p);
                }).orElseThrow(()-> new RuntimeException("Patient non trouvé")
        );
    };


    @Override
    public String deleteProduct(Long id){
        produitRepository.deleteById(id);
        return "Patient supprimé";
    };






}