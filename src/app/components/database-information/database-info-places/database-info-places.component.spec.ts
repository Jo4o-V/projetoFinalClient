import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInfoPlacesComponent } from './database-info-places.component';

describe('DatabaseInfoPlacesComponent', () => {
  let component: DatabaseInfoPlacesComponent;
  let fixture: ComponentFixture<DatabaseInfoPlacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseInfoPlacesComponent]
    });
    fixture = TestBed.createComponent(DatabaseInfoPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
