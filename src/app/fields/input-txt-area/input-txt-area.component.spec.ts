import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTxtAreaComponent } from './input-txt-area.component';

describe('InputTxtAreaComponent', () => {
  let component: InputTxtAreaComponent;
  let fixture: ComponentFixture<InputTxtAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTxtAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTxtAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
