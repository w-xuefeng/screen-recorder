import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenRecorderComponent } from './screen-recorder.component';

describe('ScreenRecorderComponent', () => {
  let component: ScreenRecorderComponent;
  let fixture: ComponentFixture<ScreenRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenRecorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
