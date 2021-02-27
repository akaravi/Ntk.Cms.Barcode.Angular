import { Component, OnInit } from '@angular/core';
import { ErrorExceptionResult, FilterModel, NewsContentModel, NewsContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-content-list',
  templateUrl: './news-content-list.component.html',
  styleUrls: ['./news-content-list.component.css']
})
export class NewsContentListComponent implements OnInit {
  filterModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<NewsContentModel> = new ErrorExceptionResult<NewsContentModel>();

  constructor(private newsContentService: NewsContentService) {}

  ngOnInit(): void {
    this.getContentList();
  }
  getContentList(): void {
    this.filterModelContent.AccessLoad = true;
    this.newsContentService
      .ServiceGetAll(this.filterModelContent)
      .subscribe((res) => {
        this.dataModelResult = res;
      });
  }
}
