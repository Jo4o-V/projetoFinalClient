import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentsRoutingModule } from './rents-routing.module';
import { RentsComponent } from './rents.component';
import { RentContractComponent } from './rent-contract/rent-contract.component';
import { RentsContractDocumentComponent } from './rents-contract-document/rents-contract-document.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    RentsComponent,
    RentContractComponent,
    RentsContractDocumentComponent,
  ],
  imports: [
    CommonModule,
    RentsRoutingModule,
    SharedModule
  ]
})
export class RentsModule { }
