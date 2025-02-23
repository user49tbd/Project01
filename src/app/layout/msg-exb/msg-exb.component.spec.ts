import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgExbComponent } from './msg-exb.component';

describe('MsgExbComponent', () => {
  let component: MsgExbComponent;
  let fixture: ComponentFixture<MsgExbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgExbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgExbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
