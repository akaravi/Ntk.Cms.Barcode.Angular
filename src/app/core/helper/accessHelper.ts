import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CoreAuthService, ErrorExceptionResult, TokenDeviceClientInfoDtoModel } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccessHelper {
  constructor(private coreAuthService: CoreAuthService, @Inject(DOCUMENT) private document: Document) { }
  CheckTokenDevice(): any {
    const domain = this.document.location.hostname;
    console.log('domain:', domain);
    const DeviceToken = this.coreAuthService.getDeviceToken();
    if (!DeviceToken || DeviceToken.length === 0) {
      const model: TokenDeviceClientInfoDtoModel = {
        SecurityKey: environment.cmsTokenConfig.SecurityKey,
        ClientMACAddress: '',
        NotificationId: '',
        OSType: environment.cmsTokenConfig.OSType,
        DeviceType: environment.cmsTokenConfig.DeviceType,
        PackageName: environment.cmsTokenConfig.PackageName,
        AppBuildVer: 0,
        AppSourceVer: '',
        Country: '',
        LocationLat: '',
        LocationLong: '',
        SimCard: '',
        Language: '',
        DeviceBrand: ''
      };
      return this.coreAuthService.ServiceGetTokenDevice(model).subscribe((next) => {
        return next
      });
    }
  }
  AccessDeleteRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessDeleteRow;
  }
  AccessWatchRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return false; // return model?.Access?.AccessWatchRow;
  }
  AccessEditRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessEditRow;
  }
  AccessAddRow(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessAddRow;
  }
  AccessRowInPanelDemo(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessRowInPanelDemo;
  }
  AccessRowWatchInSharingCategory(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessRowWatchInSharingCategory;
  }
  AccessWatchRowOtherSiteId(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return false;
  }
  AccessWatchRowOtherCreatedBy(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessWatchRowOtherCreatedBy;
  }
  AccessEditRowOtherSiteId(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessEditRowOtherSiteId;
  }
  AccessEditRowOtherCreatedBy(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessEditRowOtherCreatedBy;
  }
  AccessDeleteRowOtherCreatedBy(model: ErrorExceptionResult<any>): boolean {
    if (!model) { return false; }
    if (!model.Access) { return false; }
    return model.Access.AccessDeleteRowOtherCreatedBy;
  }
}
