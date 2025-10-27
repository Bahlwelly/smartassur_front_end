import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewContract } from './add-new-contract';

describe('AddNewContract', () => {
  let component: AddNewContract;
  let fixture: ComponentFixture<AddNewContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewContract]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewContract);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
