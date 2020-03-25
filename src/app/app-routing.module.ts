import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalListComponent } from './components/hospital-list/hospital-list.component';
import { QuarantineCenterListComponent } from './components/quarantine-center-list/quarantine-center-list.component';
import { IsolationCenterListComponent } from './Components/isolation-center-list/isolation-center-list.component';
import { TestingCenterListComponent } from './Components/testing-center-list/testing-center-list.component';
import { AddHospitalComponent } from './components/add-hospital/add-hospital.component';



const routes: Routes = [
  { path: 'hospitals', component:HospitalListComponent},
  { path: 'quarantine', component:QuarantineCenterListComponent},
  { path: 'isolationcenter', component:IsolationCenterListComponent},
  { path: 'testingcenter', component:TestingCenterListComponent},
  { path: 'AddHospital', component:AddHospitalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HospitalListComponent, 
  QuarantineCenterListComponent,
  IsolationCenterListComponent,
  TestingCenterListComponent,
  AddHospitalComponent
]
