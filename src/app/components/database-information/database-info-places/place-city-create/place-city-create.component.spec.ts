import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCityCreateComponent } from './place-city-create.component';

describe('PlaceCityCreateComponent', () => {
  let component: PlaceCityCreateComponent;
  let fixture: ComponentFixture<PlaceCityCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceCityCreateComponent]
    });
    fixture = TestBed.createComponent(PlaceCityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
