import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employe } from './employes/employe';

@Injectable({
  providedIn: 'root'
})

/* ----------------------- */
export class EmployeService {
/* ----------------------- */

  private apiRestURL = 'http://localhost:8080/employe';

  constructor(private http: HttpClient) { }
 
  /* ------------------------------------------------------ */
  /* ---------------- Modifier un employé ----------------- */
  modifyEmploye(id: number, em: Employe): Observable<Employe>
  /* ------------------------------------------------------ */
  {
    return this.http.post<Employe>(this.apiRestURL + "/modify/" + id, em);
  }
  /* ------------------------------------------------------ */
  /* ------------ Reçoit une liste d'employés ------------- */
  getEmployes(): Observable<Employe[]>
  /* ------------------------------------------------------ */
  {
    return this.http.get<Employe[]>(this.apiRestURL + "/show");
  }
  /* ------------------------------------------------------ */
  /* ----------------- Reçoit un employé ------------------ */
  getEmployeById(id: number): Observable<Employe>
  /* ------------------------------------------------------ */
  {
    return this.http.get<Employe>(this.apiRestURL + "/show/" + id);
  }
  /* ------------------------------------------------------ */
  /* ------------- Envoie un nouvel employé --------------- */
  saveEmploye(em: Employe): Observable<Employe>
  /* ------------------------------------------------------ */
  {
    return this.http.put<Employe>(this.apiRestURL + "/create", em);
  }
  /* ------------------------------------------------------ */
  /* --------------- Supprime un employé ------------------ */
  deleteEmploye(id: number): Observable<void>
  /* ------------------------------------------------------ */
  {
    return this.http.delete<void>(this.apiRestURL + "/delete/" + id);
  }
}
