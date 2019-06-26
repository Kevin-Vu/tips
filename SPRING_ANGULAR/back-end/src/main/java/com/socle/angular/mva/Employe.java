package com.socle.angular.mva;

public class Employe {

    private int id;
    private String nom;
    private String prenom;
    private int age;
    private int salaire;

    public int getId() {return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public int getAge() { return age; }
    public int getSalaire() { return salaire; }

    public void setId(int id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public void setSalaire(int salaire) { this.salaire = salaire; }
    public void setAge(int age) { this.age = age;}
}