import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { EnumFilterDataModelSearchTypes, FilterDataModel, FilterModel, FormInfoModel, HyperShopContentModel, HyperShopContentService } from 'ntk-cms-api';
import { CardModel } from 'src/app/core/models/cardModel';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CardProductSelectorComponent } from '../card-product-selector/card-product-selector.component';
import { ProductModel } from 'src/app/core/models/ProductModel';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  scannerEnabled = true;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  scannerTorch = false;
  scannerAutofocusEnabled = true;
  scannerAutostartEnabled = true;
  constructor(private hyperShopContentService: HyperShopContentService,
    private bottomSheet: MatBottomSheet,
  ) { }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  modelDataProductCode = '';
  modelData: CardModel = new CardModel();
  ngOnInit(): void {
    this.modelData.shopTitle = 'فروشگاه بزرگ کوثر ۱۳';
    this.modelData.shopTel = '3324497';
    this.getHistory();
  }
  onFormSubmit(): void {
    const filteModelContent = new FilterModel();
    const filter = new FilterDataModel();
    filter.PropertyName = 'Code';
    filter.Value = this.modelDataProductCode;
    filter.SearchType = EnumFilterDataModelSearchTypes.Contains;
    filteModelContent.Filters.push(filter);
    this.hyperShopContentService.ServiceGetAll(filteModelContent).subscribe(
      (next) => {
        // debugger
        const aaa = new HyperShopContentModel();
        aaa.Code = '1234';
        aaa.Name = 'پرتقال';
        aaa.Price = 1200;
        const ListItems = [];

        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        const bottomSheetRef = this.bottomSheet.open(CardProductSelectorComponent, {
          // data: { list: next.ListItems }
          data: {list:ListItems,title:this.modelDataProductCode}
        });
        bottomSheetRef.afterDismissed().subscribe((result) => {
          debugger
          if (result && result.event && result.event.Code) {
            const selected = result.event as HyperShopContentModel;
            const product = new ProductModel();
            product.barcode = selected.Code;
            product.title = selected.Name;
            product.cont = 1;
            product.priceOnProduct = selected.Price;
            product.priceOnShop = selected.SalePrice;
            this.addHistory(product);
          }
        });

      },
      (error) => {

      });
  }

  scanSuccessHandler($event): void {
    this.scannerEnabled = false;
    const filteModelContent = new FilterModel();
    const filter = new FilterDataModel();
    filter.PropertyName = 'Code';
    filter.Value = $event;
    filter.SearchType = EnumFilterDataModelSearchTypes.Equal;
    filteModelContent.Filters.push(filter);
    this.hyperShopContentService.ServiceGetAll(filteModelContent).subscribe(
      (next) => {
        const aaa = new HyperShopContentModel();
        aaa.Code = '1234';
        aaa.Name = 'پرتقال';
        aaa.Price = 1200;
        const ListItems = [];

        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        ListItems.push(aaa);
        const bottomSheetRef = this.bottomSheet.open(CardProductSelectorComponent, {
          // data: { list: next.ListItems }
          data: {list:ListItems,title:$event}
        });
        bottomSheetRef.afterDismissed().subscribe((result) => {
          debugger
          if (result && result.event && result.event.Code) {
            const selected = result.event as HyperShopContentModel;
            const product = new ProductModel();
            product.barcode = selected.Code;
            product.title = selected.Name;
            product.cont = 1;
            product.priceOnProduct = selected.Price;
            product.priceOnShop = selected.SalePrice;
            this.addHistory(product);
          }
        });
      },
      (error) => {

      });
  }


  camerasNotFoundHandler($event): void {
    alert('دوربین شما برای بررسی بارکد شناخته نشد');
  }
  onFormBarcodeReaderOn(): void {
    this.scannerEnabled = true;
  }
  onFormBarcodeReaderOff(): void {
    this.scannerEnabled = false;
  }
  onClickHistory(item: string): void {
    if (item && item.length > 0) {
      // this.tabChange({ key: 1 });
      // this.modelTargetGetDto.Key = item;
    }
  }
  addHistory(item: ProductModel): void {
    let retrievedObject = localStorage.getItem('history');
    let history = JSON.parse(retrievedObject);
    if (history && history.length > 0) {
      this.modelData.products = history as ProductModel[];
    } else {
      this.modelData.products = [];
    }
    this.modelData.products.push(item);


    localStorage.setItem('history', JSON.stringify(this.modelData.products));
  }
  removeHistory(item: ProductModel): void {
    let retrievedObject = localStorage.getItem('history');
    let history = JSON.parse(retrievedObject);
    if (history && history.length > 0) {
      this.modelData.products = history as ProductModel[];
      const irow = this.modelData.products.indexOf(item);
      if (irow >= 0) {
        this.modelData.products.slice(irow, 1);
      }
    } else {
      this.modelData.products = [];
    }


    localStorage.setItem('history', JSON.stringify(this.modelData.products));
  }
  getHistory(): void {
    let retrievedObject = localStorage.getItem('history');
    let history = JSON.parse(retrievedObject);
    if (history && history.length > 0) {
      this.modelData.products = history as ProductModel[];
    } else {
      this.modelData.products = [];
    }

  }
}
