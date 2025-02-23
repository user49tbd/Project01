import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainlogComponent } from './mainlog.component';

describe('MainlogComponent', () => {
  let component: MainlogComponent;
  let fixture: ComponentFixture<MainlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
