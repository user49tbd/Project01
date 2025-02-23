import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMk02Component } from './slider-mk02.component';

describe('SliderMk02Component', () => {
  let component: SliderMk02Component;
  let fixture: ComponentFixture<SliderMk02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderMk02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMk02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
