import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPageComponent } from './abm-page.component';

describe('AbmPageComponent', () => {
  let component: AbmPageComponent;
  let fixture: ComponentFixture<AbmPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmPageComponent]
    });
    fixture = TestBed.createComponent(AbmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
