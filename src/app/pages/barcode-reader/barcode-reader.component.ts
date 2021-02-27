import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css']
})
export class BarcodeReaderComponent implements OnInit {
  @Output() optionSelect = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<BarcodeReaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
  }


  title = '';
  scannerEnabled = true;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  torch = false;
  scannerAutostartEnabled = true;
  ngOnInit(): void {
  }
  scanSuccessHandler($event): void {
    const str = $event + '';
    this.optionSelect.emit(str);
  }
  camerasNotFoundHandler($event): void {
    alert('دوربین شما برای بررسی بارکد شناخته نشد');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
