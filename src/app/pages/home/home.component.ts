import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoreAuthService, EnumDeviceType, EnumOperatingSystemType, FormInfoModel, TokenDeviceClientInfoDtoModel, TokenInfoModel } from 'ntk-cms-api';
import { BarcodeFormat } from '@zxing/library';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  requestId = 0;
  scannerEnabled = false;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  torch = false;
  currentToken: TokenInfoModel;
  constructor(private activatedRoute: ActivatedRoute,
    private coreAuthService: CoreAuthService,
  ) { }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  modelDataShopCode: number;
  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.paramMap.get('Id'));
    if (this.requestId > 0) {
      this.modelDataShopCode = this.requestId;
      this.onFormSubmit();
    }
    const deviceToken = this.coreAuthService.getDeviceToken();
    if (deviceToken && deviceToken.length > 0) {
      this.coreAuthService.ServiceCurrentToken().subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.currentToken = next.Item;
          }
          else {
            this.coreAuthService.setToken('', '', '');
            this.currentToken = new TokenInfoModel();
          }

        },
        (error) => {
          this.coreAuthService.setToken('', '', '');
          this.currentToken = new TokenInfoModel();
        }
      );
    }
  }
  onFormSubmit(): void {
    if (this.modelDataShopCode <= 0) {
      return;
    }
    const model: TokenDeviceClientInfoDtoModel = new TokenDeviceClientInfoDtoModel();
    model.SecurityKey = environment.cmsTokenConfig.SecurityKey;
    model.PackageName = environment.cmsTokenConfig.PackageName + this.modelDataShopCode;
    model.OSType = EnumOperatingSystemType.none;
    model.DeviceType = EnumDeviceType.WebSite;
    this.coreAuthService.ServiceGetTokenDevice(model).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.currentToken = next.Item;
        }
      },
      (error) => {

      }
    );

  }
  onLogout(): void {
    this.coreAuthService.setToken('', '', '');
    this.currentToken = new TokenInfoModel();
  }
  onFormBarcodeReaderOn(): void {
    this.scannerEnabled = true;
  }
  onFormBarcodeReaderOff(): void {
    this.scannerEnabled = false;
  }
  scanSuccessHandler($event): void {
    this.modelDataShopCode = $event;
    this.scannerEnabled = false;
  }
  camerasNotFoundHandler($event): void {
    alert('دوربین شما برای بررسی بارکد شناخته نشد');
  }
}
