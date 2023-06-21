import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { DatabaseInformationRoutingModule } from './database-information-routing.module';
import { DatabaseInformationComponent } from './database-information.component';
import { DatabaseInfoPlacesComponent } from './database-info-places/database-info-places.component';
import { DatabaseInfoInternalCustomersComponent } from './database-info-internal-customers/database-info-internal-customers.component';
import { DatabaseInfoInternalCollaboratorsComponent } from './database-info-internal-collaborators/database-info-internal-collaborators.component';
import { DatabaseInfoInternalLocationsComponent } from './database-info-internal-locations/database-info-internal-locations.component';
import { DatabaseInfoExternalSuppliersComponent } from './database-info-external-suppliers/database-info-external-suppliers.component';
import { DatabaseInfoExternalPartnersComponent } from './database-info-external-partners/database-info-external-partners.component';
import { PlaceCountryCreateComponent } from './database-info-places/place-country-create/place-country-create.component';
import { CollaboratorsCreateComponent } from './database-info-internal-collaborators/collaborators-create/collaborators-create.component';
import { PartnersCreateComponent } from './database-info-external-partners/partners-create/partners-create.component';
import { SuppliersCreateComponent } from './database-info-external-suppliers/suppliers-create/suppliers-create.component';
import { CustomersCreateComponent } from './database-info-internal-customers/customers-create/customers-create.component';
import { LocationsCreateComponent } from './database-info-internal-locations/locations-create/locations-create.component';
import { PlaceStateCreateComponent } from './database-info-places/place-state-create/place-state-create.component';
import { PlaceCityCreateComponent } from './database-info-places/place-city-create/place-city-create.component';
import { ArrayFilterPipe } from 'src/app/models/array-filter.pipe';
import { PlaceCountryUpdateComponent } from './database-info-places/place-country-update/place-country-update.component';

@NgModule({
  declarations: [
    DatabaseInformationComponent,
    DatabaseInfoPlacesComponent,
    DatabaseInfoInternalCustomersComponent,
    DatabaseInfoInternalCollaboratorsComponent,
    DatabaseInfoInternalLocationsComponent,
    DatabaseInfoExternalSuppliersComponent,
    DatabaseInfoExternalPartnersComponent,
    PlaceCountryCreateComponent,
    CollaboratorsCreateComponent,
    PartnersCreateComponent,
    SuppliersCreateComponent,
    CustomersCreateComponent,
    LocationsCreateComponent,
    PlaceStateCreateComponent,
    PlaceCityCreateComponent,
    ArrayFilterPipe,
    PlaceCountryUpdateComponent
  ],
  imports: [
    CommonModule,
    DatabaseInformationRoutingModule,
    SharedModule,
  ]
})
export class DatabaseInformationModule { }
