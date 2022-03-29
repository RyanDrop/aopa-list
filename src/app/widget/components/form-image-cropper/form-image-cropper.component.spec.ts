import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImageCropperComponent } from './form-image-cropper.component';

describe('FormImageCropperComponent', () => {
  let component: FormImageCropperComponent;
  let fixture: ComponentFixture<FormImageCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormImageCropperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
