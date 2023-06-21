import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceStateCreateComponent } from './place-state-create.component';

describe('PlaceStateCreateComponent', () => {
  let component: PlaceStateCreateComponent;
  let fixture: ComponentFixture<PlaceStateCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceStateCreateComponent]
    });
    fixture = TestBed.createComponent(PlaceStateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
