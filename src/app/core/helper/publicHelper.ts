import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorExceptionResultBase } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicHelper {
  constructor(
    private router: Router,

  ) { }


  LocaleDate(model): string {
    const d = new Date(model);
    return d.toLocaleDateString('fa-Ir');
  }

  Truncate(value: string, limit: number = 20, trail: string = '...'): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

  RecordStatus(model): string {
    return (this.RecordStatus)[model];
  }

}
