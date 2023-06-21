import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsContractDocumentComponent } from './rents-contract-document.component';

describe('RentsReturnsComponent', () => {
  let component: RentsContractDocumentComponent;
  let fixture: ComponentFixture<RentsContractDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentsContractDocumentComponent]
    });
    fixture = TestBed.createComponent(RentsContractDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
