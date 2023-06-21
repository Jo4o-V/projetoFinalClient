import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInfoInternalCollaboratorsComponent } from './database-info-internal-collaborators.component';

describe('DatabaseInfoInternalCollaboratorsComponent', () => {
  let component: DatabaseInfoInternalCollaboratorsComponent;
  let fixture: ComponentFixture<DatabaseInfoInternalCollaboratorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseInfoInternalCollaboratorsComponent]
    });
    fixture = TestBed.createComponent(DatabaseInfoInternalCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
