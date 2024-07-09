package com.Projet.Produits.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Produits")
public class Produit {

  @Id
  @SequenceGenerator(name = "Produits_seq", sequenceName = "Produits_seq", allocationSize = 1)
  @Column(name = "id", nullable = false)
  private Long id;
  private String nom;
  private String prixUnitaire;
  private String quantite;

}
