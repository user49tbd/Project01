import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMk01Component } from './slider-mk01.component';

describe('SliderMk01Component', () => {
  let component: SliderMk01Component;
  let fixture: ComponentFixture<SliderMk01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderMk01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMk01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
