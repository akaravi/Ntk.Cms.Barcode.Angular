import { ProductModel } from "./ProductModel";

export class CardModel{
  products: ProductModel[] = [];
  sumPure = 0;
  sumDiscount = 0;
  sumPay = 0;
}
