import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInfoModel } from 'ntk-cms-api';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  scannerEnabled = false;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  torch = false;
  constructor() { }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  modelDataShopCode = '';
  ngOnInit(): void {
  }
  onFormSubmit(): void{

  }
  onFormBarcodeReaderOn(): void{
    this.scannerEnabled = true;
  }
  onFormBarcodeReaderOff(): void{
    this.scannerEnabled = false;
  }
  scanSuccessHandler($event): void {
    this.modelDataShopCode = $event;
    this.scannerEnabled = false;
  }
  camerasNotFoundHandler($event): void {

  }
}
