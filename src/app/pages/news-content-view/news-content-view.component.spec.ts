import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsContentViewComponent } from './news-content-view.component';

describe('NewsContentViewComponent', () => {
  let component: NewsContentViewComponent;
  let fixture: ComponentFixture<NewsContentViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
