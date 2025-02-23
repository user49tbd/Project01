import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCOmpComponent } from './logo-comp.component';

describe('LogoCOmpComponent', () => {
  let component: LogoCOmpComponent;
  let fixture: ComponentFixture<LogoCOmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCOmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoCOmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
