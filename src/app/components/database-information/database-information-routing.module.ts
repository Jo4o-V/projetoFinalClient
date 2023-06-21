import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseInfoPlacesComponent } from './database-info-places/database-info-places.component';
import { DatabaseInfoInternalCustomersComponent } from './database-info-internal-customers/database-info-internal-customers.component';
import { DatabaseInfoInternalCollaboratorsComponent } from './database-info-internal-collaborators/database-info-internal-collaborators.component';
import { DatabaseInfoInternalLocationsComponent } from './database-info-internal-locations/database-info-internal-locations.component';
import { DatabaseInfoExternalSuppliersComponent } from './database-info-external-suppliers/database-info-external-suppliers.component';
import { DatabaseInfoExternalPartnersComponent } from './database-info-external-partners/database-info-external-partners.component';

const routes: Routes = [
  {
    path: 'internal/customers',
    component: DatabaseInfoInternalCustomersComponent
  },
  {
    path: 'internal/collaborators',
    component: DatabaseInfoInternalCollaboratorsComponent
  },
  {
    path: 'internal/locations',
    component: DatabaseInfoInternalLocationsComponent
  },
  {
    path: 'external/suppliers',
    component: DatabaseInfoExternalSuppliersComponent
  },
  {
    path: 'external/partners',
    component: DatabaseInfoExternalPartnersComponent
  },
  {
    path: 'places',
    component: DatabaseInfoPlacesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseInformationRoutingModule { }
