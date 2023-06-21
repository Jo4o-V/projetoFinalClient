import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentContractComponent } from './rent-contract.component';

describe('RentContractComponent', () => {
  let component: RentContractComponent;
  let fixture: ComponentFixture<RentContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentContractComponent]
    });
    fixture = TestBed.createComponent(RentContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
