package com.socle.angular.mva;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/employe")
@RestController
public class Controller {

    private List<Employe> employeList;

    Controller(){this.employeList = buildListEmploye();}

    /* ------------------------------------------------------ */
    /* ------------- Envoie la liste des employes ----------- */
    @RequestMapping(value = "/show", method = RequestMethod.GET)
    public List<Employe> sendEmploye()
    /* ------------------------------------------------------ */
    {
        return this.employeList;
    }
    /* ----------------------------------------------------------- */
    /* ------------ Envoie un employé suivant son ID ------------- */
    @RequestMapping(value = "/show/{id}", method = RequestMethod.GET)
    public Employe sendEmployeById(@PathVariable("id") int id)
    /* ----------------------------------------------------------- */
    {
        if(id > this.employeList.size() - 1 || id < 0)
            return null;
        return this.employeList.get(id);
    }
    /* ------------------------------------------------------------------------ */
    /* ------------------ Modifie un employé suivant son ID ------------------- */
    @RequestMapping(value = "/modify/{id}", method = RequestMethod.POST)
    public void modifyEmploye(@PathVariable("id") int id, @RequestBody Employe em)
    /* ------------------------------------------------------------------------ */
    {
        if(id > this.employeList.size() - 1 || id < 0)
            return;
        this.employeList.set(id, em);
    }
    /* -------------------------------------------------------- */
    /* --------------- Créer un nouvel employé ---------------- */
    @RequestMapping(value = "/create", method = RequestMethod.PUT)
    public void createEmploye(@RequestBody Employe em)
    /* -------------------------------------------------------- */
    {
        em.setId(this.employeList.size());
        this.employeList.add(em);
    }
    /* ---------------------------------------------------------------- */
    /* ---------------------- Supprime un employé --------------------- */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteEmploye(@PathVariable("id") int id)
    /* ---------------------------------------------------------------- */
    {
        if(id > this.employeList.size() - 1 || id < 0)
            return;
        this.employeList.remove(id);
        for(int i = id; i < this.employeList.size(); i++){this.employeList.get(i).setId(i);}
    }
    /* ---------------------------------- */
    /* - Construit une liste d'employés - */
    private List<Employe> buildListEmploye()
    /* ---------------------------------- */
    {
        List<Employe> employeList = new ArrayList<>();
        employeList.add(buildEmploye(0, "Marlois", "Adam", 31, 2800));
        employeList.add(buildEmploye(1, "Oliviera", "Daphnee", 40, 3000));
        employeList.add(buildEmploye(2, "Lanceur", "David", 28, 2800));
        employeList.add(buildEmploye(3, "Roussel", "Amelie", 30, 2400));
        return employeList;
    }
    /* ------------------------------------------------------------------------------- */
    /* ----------------------------- Construit un employé ---------------------------- */
    private Employe buildEmploye(int id, String nom, String prenom, int age, int salaire)
    /* ------------------------------------------------------------------------------- */
    {
        Employe em = new Employe();
        em.setId(id);
        em.setNom(nom);
        em.setPrenom(prenom);
        em.setAge(age);
        em.setSalaire(salaire);
        return em;
    }

}