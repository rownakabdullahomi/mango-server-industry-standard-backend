import { Request, Response } from "express";
import Mango from "./mango.model";
import { MangoServices } from "./mango.service";
import { catchAsync } from "../../utils/catchAsync";



const createMango = catchAsync(async (req: Request, res: Response) => {
  const data = await MangoServices.createMangoIntoDB(req.body);
  res.send({
    success: true,
    message: "Mango Created Successfully",
    data,
  });
});

const getMangos = catchAsync(async (req: Request, res: Response) => {
  const data = await Mango.find();

  res.send({
    success: true,
    message: "Mango getting Successfully",
    data,
  });
});

const getMangoById = async (req: Request, res: Response) => {
  try {
    const mangoId = req.params.mangoId;
    const data = await MangoServices.getMangoByIdFromDB(mangoId);

    res.send({
      success: true,
      message: "Mango getting Successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};

const updateMango = async (req: Request, res: Response) => {
  try {
    const mangoId = req.params.mangoId;

    const data = await Mango.findByIdAndUpdate(mangoId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({
      success: true,
      message: "Mango updated Successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};

const deleteMangoById = async (req: Request, res: Response) => {
  const mangoId = req.params.mangoId;

  const data = await Mango.findByIdAndDelete(mangoId);
  res.send({
    success: true,
    message: "Mango deleted Successfully",
    data,
  });
};

export const mangoController = {
  createMango,
  getMangos,
  getMangoById,
  updateMango,
  deleteMangoById,
};
