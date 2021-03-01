import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NewsContentListComponent } from './pages/news-content-list/news-content-list.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ZXingScannerModule } from 'angular-weblineindia-qrcode-scanner';
import { SplashComponent } from './pages/splash/splash.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppConfigService } from './core/services/appConfig.service';
import { CoreAuthService, CoreSiteService, HyperShopContentService, NewsContentService, WebDesignerMainIntroService } from 'ntk-cms-api';
import { AccessHelper } from './core/helper/accessHelper';
import { CmsStoreModule } from './core/reducers/cmsStore.module';
import { BarcodeReaderComponent } from './pages/barcode-reader/barcode-reader.component';
import { DeviceLoginComponent } from './pages/device-login/device-login.component';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { CardProductSelectorComponent } from './pages/card-product-selector/card-product-selector.component';
import { NewsContentViewComponentComponent } from './pages/news-content-view-component/news-content-view-component.component';
import { NewsContentViewComponent } from './pages/news-content-view/news-content-view.component';

export function appInit(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    NewsContentListComponent,
    CardListComponent,
    SplashComponent,
    BarcodeReaderComponent,
    DeviceLoginComponent,
    CardProductSelectorComponent,
    NewsContentViewComponentComponent,
    NewsContentViewComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    SharedModule.forRoot(),
    CmsStoreModule.forRoot(),
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CoreAuthService,
    CoreSiteService,
    AppConfigService,
    HyperShopContentService,
    WebDesignerMainIntroService,
    NewsContentService,
    AccessHelper,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfigService]
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private coreAuthService: CoreAuthService) {
    // karavi:Important For Test To Local Service
    if (environment.cmsServerConfig.configApiServerPath && environment.cmsServerConfig.configApiServerPath.length > 0) {
      this.coreAuthService.setConfig(environment.cmsServerConfig.configApiServerPath);
    }

  }
}
