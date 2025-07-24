import { NextFunction, Request, Response } from "express";
import { FilterQuery, Model } from "mongoose";

export const queryBuilder = <T>(model: Model<T>, searchFields: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = { ...req.query };
      const mongoQuery: FilterQuery<T> = {};


      /// Search Operation 
      const searchTerm = queryParams.searchTerm as string;

      if (searchTerm) {
        mongoQuery.$or = searchFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        );
      }

      const excludeFields = ["searchTerm", "sort"];

      /// Filter Operation 
      const filter = excludeFields.forEach(
        (field) => delete queryParams[field]
      );

      for (const key in queryParams) {
        const value = queryParams[key];

        if (typeof value === "string") {
          (mongoQuery as any)[key] = { $regex: value, $options: "i" };
        }
      }

      const query = await model.find(mongoQuery);
      console.log({ query });

      next();
    } catch (error) {}
  };
};
