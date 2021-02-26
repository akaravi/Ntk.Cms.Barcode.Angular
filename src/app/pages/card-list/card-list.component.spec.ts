import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLIstComponent } from './card-list.component';

describe('CardLIstComponent', () => {
  let component: CardLIstComponent;
  let fixture: ComponentFixture<CardLIstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardLIstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
