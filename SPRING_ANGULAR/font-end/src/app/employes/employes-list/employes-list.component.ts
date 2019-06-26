import { Component, OnInit } from '@angular/core';
import { Employe } from '../employe';
import { EmployeService} from '../../employe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employes-list',
  templateUrl: './employes-list.component.html',
  styleUrls: ['./employes-list.component.css']
})

/* ------------------------------------------------ */
export class EmployesListComponent implements OnInit {
/* ------------------------------------------------ */

  employes : Employe[];
  interval : any;

  constructor(private router: Router,
        private employeService : EmployeService) { }

  /* ---- */
  ngOnInit()  // Appelée à l'ouverture de la page HTML
  /* ---- */
  {
    this.getEmployes();
   /* this.interval = setTimeout( () => {  // Re-GET employés après 500ms
        this.getEmployes();
    },500);*/
  }
  /* ------- */
  getEmployes()  // Get des employés
  /* ------- */ 
  {
    this.employeService.getEmployes().subscribe(  // Subscribe -> attend changement niveau serveur
      employes => {
        this.employes = employes;
      },
      err => {
        console.log(err);
      }
    )
  }
  /* ------------------ */ 
  redirectNewEmployePage()  // Redirige vers employes-create.component.html -> Nouvel employé
  /* ------------------ */ 
  {
     this.router.navigate(['/employe/create']);
  }
  /* --------------------------- */ 
  editEmployePage(employe: Employe)  // Redirige vers employes-create.component.html -> Modif employé
  /* --------------------------- */
  {
     if (employe) 
     {
       this.router.navigate(['/employe/edit', employe.id]);
     }
  }
  /* ------------------------- */
  deleteEmploye(employe: Employe)  // Supprimer un employé
  /* ------------------------- */
  {
  if (employe) 
    {
      this.employeService.deleteEmploye(employe.id).subscribe(
        res => {
          this.getEmployes();
        }
      );
    }
  }
}