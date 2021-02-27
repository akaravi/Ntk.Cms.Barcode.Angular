import { Component, OnInit } from '@angular/core';
import { CoreAuthService, TokenInfoModel } from 'ntk-cms-api';
import { CmsStoreService } from './core/reducers/cmsStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private coreAuthService: CoreAuthService, private cmsStoreService: CmsStoreService) {
  }
  title = 'بارکد فروشگاهی';
  ngOnInit(): void {
    const storeSnapshot = this.cmsStoreService.getStateSnapshot();
    if (storeSnapshot && storeSnapshot.tokenInfoState && storeSnapshot.tokenInfoState.SiteId && storeSnapshot.tokenInfoState.SiteId > 0) {
      this.title = storeSnapshot.tokenInfoState.Title;
      return;
    }
    const deviceToken = this.coreAuthService.getDeviceToken();
    if (deviceToken && deviceToken.length > 0) {
      this.coreAuthService.ServiceCurrentToken().subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.cmsStoreService.setState({ tokenInfoState: next.Item });
          }
          else {
            this.coreAuthService.setToken('', '', '');
            this.cmsStoreService.setState({ tokenInfoState: new TokenInfoModel() });

          }

        },
        (error) => {
          this.coreAuthService.setToken('', '', '');
          this.cmsStoreService.setState({ tokenInfoState: new TokenInfoModel() });
        }
      );
    }
  }
}
