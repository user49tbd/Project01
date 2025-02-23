import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgLayoutComponent } from './img-layout.component';

describe('ImgLayoutComponent', () => {
  let component: ImgLayoutComponent;
  let fixture: ComponentFixture<ImgLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
