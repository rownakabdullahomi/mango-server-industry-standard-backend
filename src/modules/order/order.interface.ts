// userId, mangoId, quantity, totalPrice, status, address

import { Model, Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  mango: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: string;
  address: {
    zipcode: string;
    state: string;
    country: string;
    street: string;
  };
}

export interface IOrderMethods {
  // for instance method
  checkStock(id: string): Promise<any>;
}

// export interface IOrderModel extends Model<IOrder> {}
export interface IOrderModel extends Model<IOrder, {}, IOrderMethods> {
  // for static method
  checkStock(id: string, quantity: number): Promise<any>;
}
