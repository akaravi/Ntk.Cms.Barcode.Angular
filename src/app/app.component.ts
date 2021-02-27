import { Component } from '@angular/core';
import { CoreAuthService } from 'ntk-cms-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private coreAuthService: CoreAuthService){
  }
  ngOnInit(): void {
    this.coreAuthService.getDeviceToken()
  }
  title = 'بارکد فروشگاهی';
}
