import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInfoInternalLocationsComponent } from './database-info-internal-locations.component';

describe('DatabaseInfoInternalLocationsComponent', () => {
  let component: DatabaseInfoInternalLocationsComponent;
  let fixture: ComponentFixture<DatabaseInfoInternalLocationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseInfoInternalLocationsComponent]
    });
    fixture = TestBed.createComponent(DatabaseInfoInternalLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
