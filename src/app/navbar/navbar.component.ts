import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private _isHandset = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        this._isHandset = result.matches;
        return result.matches;
      }),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
  title = 'بارکدخوان فروشگاهی';
  onActionClick(drawer: any) {
    if (this._isHandset) {
      drawer.toggle()
    }
  }
}
