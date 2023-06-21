import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInfoExternalPartnersComponent } from './database-info-external-partners.component';

describe('DatabaseInfoExternalPartnersComponent', () => {
  let component: DatabaseInfoExternalPartnersComponent;
  let fixture: ComponentFixture<DatabaseInfoExternalPartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseInfoExternalPartnersComponent]
    });
    fixture = TestBed.createComponent(DatabaseInfoExternalPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
