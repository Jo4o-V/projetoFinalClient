import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHelpComponent } from './about-help.component';

describe('AboutHelpComponent', () => {
  let component: AboutHelpComponent;
  let fixture: ComponentFixture<AboutHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutHelpComponent]
    });
    fixture = TestBed.createComponent(AboutHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
