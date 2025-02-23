import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyGComponent } from './poly-g.component';

describe('PolyGComponent', () => {
  let component: PolyGComponent;
  let fixture: ComponentFixture<PolyGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolyGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolyGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
