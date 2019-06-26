import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../employe';
import { EmployeService } from '../../employe.service';

@Component({
  selector: 'app-employes-create',
  templateUrl: './employes-create.component.html',
  styleUrls: ['./employes-create.component.css']
})

/* -------------------------------------------------- */
export class EmployesCreateComponent implements OnInit {
/* -------------------------------------------------- */ 

  id: number;
  private sub: any;

  textNom: string;
  textPrenom: string;
  textAge: number;
  textSalaire: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeService: EmployeService) { }

  /* ---- */
  ngOnInit()  // Appelée à l'ouverture de la page HTML
  /* ---- */
  {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id)  // Si on arrive sur cette page depuis editEmployePage(employe: Employe) 
    {
      this.employeService.getEmployeById(this.id).subscribe(
        employe => {
          this.id = employe.id;
          this.textNom = employe.nom;
          this.textPrenom = employe.prenom;
          this.textAge = employe.age;
          this.textSalaire = employe.salaire;
        }
      );
    }
  }
  /* ------- */
  saveEmploye()  // Enregistre/Modifie un employé dans la liste
  /* ------- */
  {
    if(this.textNom === "" || this.textNom === null || this.textNom === undefined)
      return;
    if(this.textPrenom === "" || this.textPrenom === null || this.textPrenom === undefined)
      return;
    if(this.textAge === null || this.textAge === undefined)
      return;
    if(this.textSalaire === null || this.textSalaire === undefined)
      return;
    if(this.id) // Modifie un employé dans la liste avec ID
    {
      let employe: Employe = new Employe(
        this.id, 
        this.textNom, 
        this.textPrenom,
        this.textAge, 
        this.textSalaire);
      this.employeService.modifyEmploye(this.id, employe).subscribe();
    }
    else{  // Sauvegarde un nouvel employé
      let employe: Employe = new Employe(
        null, 
        this.textNom, 
        this.textPrenom,
        this.textAge, 
        this.textSalaire);
      this.employeService.saveEmploye(employe).subscribe();
    }
    this.router.navigate(['/employe']);  // Redirige vers la page /employe
  }
  /* ----------- */
  redirectEmploye() // Redirige vers la page /employe
  /* ----------- */ 
  {
    this.router.navigate(['/employe']);
  }

}