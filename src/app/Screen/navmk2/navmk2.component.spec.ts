import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navmk2Component } from './navmk2.component';

describe('Navmk2Component', () => {
  let component: Navmk2Component;
  let fixture: ComponentFixture<Navmk2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navmk2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navmk2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
