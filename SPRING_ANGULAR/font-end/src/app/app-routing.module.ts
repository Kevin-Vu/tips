import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployesListComponent } from './employes/employes-list/employes-list.component';
import { EmployesEditComponent } from './employes/employes-edit/employes-edit.component';
import { EmployesCreateComponent } from './employes/employes-create/employes-create.component';

const routes: Routes = [
	{path: 'employe', component: EmployesListComponent},
	{path: 'employe/create', component: EmployesCreateComponent},
	{path: 'employe/edit/:id', component: EmployesCreateComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
