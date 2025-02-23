import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpCardComponent } from './simp-card.component';

describe('SimpCardComponent', () => {
  let component: SimpCardComponent;
  let fixture: ComponentFixture<SimpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
