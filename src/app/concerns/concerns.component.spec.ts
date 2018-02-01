import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernsComponent } from './concerns.component';

describe('ConcernsComponent', () => {
  let component: ConcernsComponent;
  let fixture: ComponentFixture<ConcernsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcernsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
