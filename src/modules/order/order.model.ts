import { model, Schema } from "mongoose";
import { IOrder, IOrderMethods, IOrderModel } from "./order.interface";
import Mango from "../mango/mango.model";

const orderAddressSchema = new Schema({
  zipcode: String,
  state: String,
  country: String,
  street: String,
});

const orderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  mango: { type: Schema.Types.ObjectId, ref: "Mango", required: true },
  quantity: { type: Number, min: 0, required: true },
  totalPrice: { type: Number, min: 0 },
  //   address: {
  //     zipcode: String,
  //     state: String,
  //     country: String,
  //     street: String,
  //   },
  address: { type: orderAddressSchema, required: true },
  status: { type: String, required: true },
});

orderSchema.pre("save", async function () {
  console.log("doc from pre " + this);

  const mango = await Mango.findById(this.mango);
  if (!mango) throw new Error("Mango not found");

  this.totalPrice = mango.price * this.quantity;
});

// orderSchema.post("save", function (doc, next) {
//   console.log("doc from post " + doc);

//   const plainAddress =
//     doc.address.street +
//     " " +
//     doc.address.state +
//     " " +
//     doc.address.zipcode +
//     doc.address.country;

//   doc.address = { ...doc.address, plainAddress };

//   console.log({ doc });

//   next();
// });

// orderSchema.method("checkStock", function checkStock(id) {
//   console.log(id);
//   return
// });

orderSchema.static("checkStock", async function checkStock(id, quantity) {
  const product = await Mango.findById(id);
  if (!product) throw new Error("Product not found");

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  return true;
});

orderSchema.method("checkStock", async function checkStock() {
  const order = this as IOrder;

  const product = await Mango.findById(order.mango);
  if (!product) throw new Error("Product not found");

  if (product.stock < order.quantity) {
    throw new Error("Insufficient stock");
  }

  return true;
});

const Order = model<IOrder, IOrderModel>("Order", orderSchema);
export default Order;
