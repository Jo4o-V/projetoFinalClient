import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInfoInternalCustomersComponent } from './database-info-internal-customers.component';

describe('DatabaseInfoInternalCustomersComponent', () => {
  let component: DatabaseInfoInternalCustomersComponent;
  let fixture: ComponentFixture<DatabaseInfoInternalCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseInfoInternalCustomersComponent]
    });
    fixture = TestBed.createComponent(DatabaseInfoInternalCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
