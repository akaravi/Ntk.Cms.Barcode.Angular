import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-card-product-selector',
  templateUrl: './card-product-selector.component.html',
  styleUrls: ['./card-product-selector.component.css']
})
export class CardProductSelectorComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<CardProductSelectorComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.title = data.title;
    this.dataModelList = data.list;
  }
  title = '';
  dataModelList : HyperShopContentModel[];
  ngOnInit(): void {

  }
  openLink(model: HyperShopContentModel): void {
    this.bottomSheetRef.dismiss({ model });
  }

}
