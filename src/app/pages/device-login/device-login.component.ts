import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoreAuthService, EnumDeviceType, EnumOperatingSystemType, FormInfoModel, TokenDeviceClientInfoDtoModel, TokenInfoModel } from 'ntk-cms-api';
import { BarcodeFormat } from '@zxing/library';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ReducerCmsStore } from 'src/app/core/reducers/reducer.factory';
import { BarcodeReaderComponent } from '../barcode-reader/barcode-reader.component';

@Component({
  selector: 'app-device-login',
  templateUrl: './device-login.component.html',
  styleUrls: ['./device-login.component.css']
})
export class DeviceLoginComponent  implements OnInit {
  requestId = 0;
  scannerEnabled = false;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  scannerTorch = false;
  scannerAutofocusEnabled = true;
  currentToken: TokenInfoModel;
  constructor(
    private cmsStoreService: CmsStoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coreAuthService: CoreAuthService,
  ) { }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  modelDataShopCode: number;
  loadingEnabled = false;
  ngOnInit(): void {
    this.requestId = Number(this.activatedRoute.snapshot.paramMap.get('Id'));
    if (this.requestId > 0) {
      this.ActionToken(this.requestId);
    }
    const storeSnapshot = this.cmsStoreService.getStateSnapshot();
    this.checkStore(storeSnapshot);

    this.cmsStoreService.getState().subscribe((next) => {
        this.checkStore(next);
    });
  }
  checkStore(storeSnapshot: ReducerCmsStore){
    if (storeSnapshot && storeSnapshot.tokenInfoState && storeSnapshot.tokenInfoState.SiteId && storeSnapshot.tokenInfoState.SiteId > 0) {
      this.currentToken = storeSnapshot.tokenInfoState;
      this.scannerEnabled = false;
      this.router.navigate(['cardlist']);
      return;
    } else {
      this.scannerEnabled = true;
    }
  }
  onFormSubmit(): void {
    if (this.modelDataShopCode > 0) {
      this.ActionToken(this.modelDataShopCode);
    }
  }
  ActionToken(shopCode: number): void {

    const model: TokenDeviceClientInfoDtoModel = new TokenDeviceClientInfoDtoModel();
    model.SecurityKey = environment.cmsTokenConfig.SecurityKey;
    model.PackageName = environment.cmsTokenConfig.PackageName + shopCode;
    model.OSType = EnumOperatingSystemType.none;
    model.DeviceType = EnumDeviceType.WebSite;
    this.loadingEnabled = true;
    this.coreAuthService.ServiceGetTokenDevice(model).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.currentToken = next.Item;
          this.cmsStoreService.setState({ tokenInfoState: next.Item });
          this.scannerEnabled = false;
        }
        this.loadingEnabled = false;
      },
      (error) => {
        this.loadingEnabled = false;
      }
    );

  }
  onLogout(): void {
    this.coreAuthService.setToken('', '', '');
    this.scannerEnabled = true;
    this.currentToken = new TokenInfoModel();
  }
  onFormBarcodeReaderOn(): void {
    this.scannerEnabled = true;
  }
  onFormBarcodeReaderOff(): void {
    this.scannerEnabled = false;
  }
  scanSuccessHandler($event): void {
    const str = $event + '';
    if (str.indexOf('://') > 0) {
      const strList = str.split('/');
      if (strList.length > 0) {
        const code = + strList[strList.length - 1];
        if (code > 0) {
          this.ActionToken(code);

        }
      }
    }
  }
  camerasNotFoundHandler($event): void {
    this.scannerEnabled = false;
    alert('دوربین شما برای بررسی بارکد شناخته نشد');
  }
  onActionStart(): void{
    this.router.navigate(['cardlist']);
  }

}
