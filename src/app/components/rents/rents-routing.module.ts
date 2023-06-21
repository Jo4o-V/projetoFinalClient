import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentsComponent } from './rents.component';
import { RentContractComponent } from './rent-contract/rent-contract.component';
import { RentsContractDocumentComponent } from './rents-contract-document/rents-contract-document.component';

const routes: Routes = [
  {
    path: 'register-new-realise',
    component: RentsComponent
  },
  {
    path: 'contracts',
    component: RentContractComponent
  },
  {
    path: 'contract-document',
    component: RentsContractDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentsRoutingModule { }
