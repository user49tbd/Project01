import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButonCComponent } from './buton-c.component';

describe('ButonCComponent', () => {
  let component: ButonCComponent;
  let fixture: ComponentFixture<ButonCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButonCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButonCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
