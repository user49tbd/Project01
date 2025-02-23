import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMk01Component } from './load-mk01.component';

describe('LoadMk01Component', () => {
  let component: LoadMk01Component;
  let fixture: ComponentFixture<LoadMk01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadMk01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadMk01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
