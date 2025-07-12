import { Request, Response } from "express";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  const checkStock = await Order.checkStock(
    req.body.mango as string,
    req.body.quantity
  );
  if (!checkStock) throw new Error("Insufficient Stock");
  const order = await Order.create(req.body);

  //   const order = new Order(req.body);
  //   const orderStock = await order.checkStock(req.body.mango);
  //   if (!orderStock) throw new Error("Insufficient Stock");

  //   await order.save();

  res.send({
    success: true,
    message: "Mango Ordered Successfully",
    data: order,
  });
};

const getOrders = async (req: Request, res: Response) => {
  const order = await Order.find().populate("user").populate("mango");

  res.send({
    success: true,
    message: "Mango Order getting Successfully",
    data: order,
  });
};

export const orderController = {
  createOrder,
  getOrders,
};
