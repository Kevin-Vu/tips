import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployesListComponent } from './employes/employes-list/employes-list.component';
import { EmployesCreateComponent } from './employes/employes-create/employes-create.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployesEditComponent } from './employes/employes-edit/employes-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployesListComponent,
    EmployesCreateComponent,
    EmployesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
