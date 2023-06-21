import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInfoExternalSuppliersComponent } from './database-info-external-suppliers.component';

describe('DatabaseInfoExternalSuppliersComponent', () => {
  let component: DatabaseInfoExternalSuppliersComponent;
  let fixture: ComponentFixture<DatabaseInfoExternalSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseInfoExternalSuppliersComponent]
    });
    fixture = TestBed.createComponent(DatabaseInfoExternalSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
