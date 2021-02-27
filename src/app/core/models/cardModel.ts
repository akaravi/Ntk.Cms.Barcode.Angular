import { ProductModel } from "./ProductModel";

export class CardModel{
  shopTitle: string;
  shopTel: string;
  products: ProductModel[] = [];
  sumPure = 0;
  sumDiscount = 0;
  sumPay = 0;
}
