import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoreAuthService, EnumDeviceType, EnumOperatingSystemType, FormInfoModel, TokenDeviceClientInfoDtoModel, TokenInfoModel } from 'ntk-cms-api';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ReducerCmsStore } from 'src/app/core/reducers/reducer.factory';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentToken: TokenInfoModel;
  constructor(
    private cmsStoreService: CmsStoreService,
    private router: Router,
    private coreAuthService: CoreAuthService,
  ) { }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  loadingEnabled = false;
  ngOnInit(): void {

    const storeSnapshot = this.cmsStoreService.getStateSnapshot();
    this.checkStore(storeSnapshot);

    this.cmsStoreService.getState().subscribe((next) => {
        this.checkStore(next);
    });
  }
  checkStore(storeSnapshot: ReducerCmsStore){
    if (storeSnapshot && storeSnapshot.tokenInfoState && storeSnapshot.tokenInfoState.SiteId && storeSnapshot.tokenInfoState.SiteId > 0) {
      this.currentToken = storeSnapshot.tokenInfoState;
      return;
    }
  }
  onFormSubmit(): void {

  }

  onLogout(): void {
    this.coreAuthService.setToken('', '', '');
    this.currentToken = new TokenInfoModel();
  }

  onActionStart(): void{
    this.router.navigate(['cardlist']);
  }
  onActionLogin(): void{
    this.router.navigate(['devicelogin']);
  }

}
