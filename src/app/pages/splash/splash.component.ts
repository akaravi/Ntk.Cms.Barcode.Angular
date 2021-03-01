import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) {
    const splash = localStorage.getItem('splash');
    if (splash && splash.length > 0) {
     // todo: karavi this.router.navigate(['home']);
    }
   }

  ngOnInit(): void {
  }
  onActionStart(): void{
    localStorage.setItem('splash', '1');
    this.router.navigate(['home']);
  }
}
