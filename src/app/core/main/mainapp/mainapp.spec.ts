import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mainapp } from './mainapp';

describe('Mainapp', () => {
  let component: Mainapp;
  let fixture: ComponentFixture<Mainapp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mainapp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mainapp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
