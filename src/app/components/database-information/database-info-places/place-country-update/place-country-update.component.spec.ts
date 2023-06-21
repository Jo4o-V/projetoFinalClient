import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCountryUpdateComponent } from './place-country-update.component';

describe('PlaceCountryUpdateComponent', () => {
  let component: PlaceCountryUpdateComponent;
  let fixture: ComponentFixture<PlaceCountryUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceCountryUpdateComponent]
    });
    fixture = TestBed.createComponent(PlaceCountryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
