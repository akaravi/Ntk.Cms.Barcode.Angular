import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DeviceLoginComponent } from './pages/device-login/device-login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsContentListComponent } from './pages/news-content-list/news-content-list.component';
import { SplashComponent } from './pages/splash/splash.component';



const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'devicelogin',
    component: DeviceLoginComponent,
  },
  {
    path: 'devicelogin/:Id',
    component: DeviceLoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'splash',
    component: SplashComponent,
  },
  {
    path: 'cardlist',
    component: CardListComponent,
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
  },
  {
    path: 'contactus',
    component: ContactUsComponent,
  },
  {
    path: 'news',
    component: NewsContentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
