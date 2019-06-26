export class Employe {
 
  id: number;
  nom: string;
  prenom: string;
  age: number;
  salaire: number;
 
  constructor(id: number, nom: string, prenom : string, age : number, salaire : number){
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.salaire = salaire;
  }
 
}