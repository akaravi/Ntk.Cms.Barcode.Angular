import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    this.modelDate='...';
  }
  modelDate: any;

  scannerEnabled = true;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  torch = false;
  onTorchCompatible($event): void {
    // console.log($event);
    // this.modelDate = $event
  }
  camerasFoundHandler($event): void {
    // console.log($event);
    // this.modelDate = $event
  }
  camerasNotFoundHandler($event): void {
    // console.log($event);
    // this.modelDate = $event
  }
  scanSuccessHandler($event): void {
    console.log($event);
    this.modelDate = $event
  }
  scanErrorHandler($event): void {
    // console.log($event);
    // this.modelDate = $event
  }
  scanFailureHandler($event): void {
    // console.log($event);
    // this.modelDate = $event
  }
  scanCompleteHandler($event): void {
    // console.log($event);
    // this.modelDate = $event
  }

}
