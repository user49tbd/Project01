import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponenetComponent } from './input-componenet.component';

describe('InputComponenetComponent', () => {
  let component: InputComponenetComponent;
  let fixture: ComponentFixture<InputComponenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponenetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
