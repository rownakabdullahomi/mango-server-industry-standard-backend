import { NextFunction, Request, Response } from "express";

export const queryBuilder = () => {
 return async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const queryParam = {...req.query}
        console.log(queryParam);

        next();
    } catch (error) {
        
    }
  };
};
