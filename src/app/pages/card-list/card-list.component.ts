import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { FormInfoModel } from 'ntk-cms-api';
import { CardModel } from 'src/app/core/models/cardModel';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  scannerEnabled = false;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  torch = false;
  constructor() { }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  modelDataProductCode = '';
  modelHistoryList: string[];
  modelData: CardModel = new CardModel();
  ngOnInit(): void {
    this.modelData.shopTitle = 'فروشگاه بزرگ کوثر ۱۳';
    this.modelData.shopTel = '3324497';
    }
  onFormSubmit(): void {
    this.addHistory(this.modelDataProductCode);

  }
  onFormBarcodeReaderOn(): void {
    this.scannerEnabled = true;
  }
  onFormBarcodeReaderOff(): void {
    this.scannerEnabled = false;
  }
  scanSuccessHandler($event): void {
    this.modelDataProductCode = $event;
    this.scannerEnabled = false;
    this.addHistory(this.modelDataProductCode);
  }
  camerasNotFoundHandler($event): void {
    alert('دوربین شما برای بررسی بارکد شناخته نشد');
  }
  onClickHistory(item: string): void {
    if (item && item.length > 0) {
      // this.tabChange({ key: 1 });
      // this.modelTargetGetDto.Key = item;
    }
  }
  addHistory(item: string): void {
    let history = localStorage.getItem('history');
    // debugger;
    if (history && history.length > 0) {
      if (history.indexOf(item) < 0) {
        history = item + ',' + history;
      }
    } else {
      history = item;
    }

    this.modelHistoryList = history.split(',');
    if (this.modelHistoryList.length > 10) {
      this.modelHistoryList.length = 10;
    }
    localStorage.setItem('history', this.modelHistoryList.join(','));
  }
  removeHistory(item: string): void {
    let history = localStorage.getItem('history');
    // debugger;
    if (history && history.length > 0) {
      if (history.indexOf(item) < 0) {
        history = item + ',' + history;
      }
    } else {
      history = item;
    }

    this.modelHistoryList = history.split(',');
    if (this.modelHistoryList.length > 10) {
      this.modelHistoryList.length = 10;
    }
    localStorage.setItem('history', this.modelHistoryList.join(','));
  }
  getHistory(): void {
    let history = localStorage.getItem('history');
    if (history && history.length > 0) {
      this.modelHistoryList = history.split(',');
      return;
    }
    history = '';
    localStorage.setItem('history', history);
    this.modelHistoryList = history.split(',');
  }
}
