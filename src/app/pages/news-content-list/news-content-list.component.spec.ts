import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsContentListComponent } from './news-content-list.component';

describe('NewsContentListComponent', () => {
  let component: NewsContentListComponent;
  let fixture: ComponentFixture<NewsContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
