import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCountryCreateComponent } from './place-country-create.component';

describe('PlaceCountryCreateComponent', () => {
  let component: PlaceCountryCreateComponent;
  let fixture: ComponentFixture<PlaceCountryCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceCountryCreateComponent]
    });
    fixture = TestBed.createComponent(PlaceCountryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
