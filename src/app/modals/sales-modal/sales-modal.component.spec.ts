import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesModalComponent } from './sales-modal.component';

describe('SalesModalComponent', () => {
  let component: SalesModalComponent;
  let fixture: ComponentFixture<SalesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
