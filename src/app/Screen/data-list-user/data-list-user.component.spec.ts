import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListUserComponent } from './data-list-user.component';

describe('DataListUserComponent', () => {
  let component: DataListUserComponent;
  let fixture: ComponentFixture<DataListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataListUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
