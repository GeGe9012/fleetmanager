import { Request, Response, NextFunction } from "express";
import { AnyObject, ObjectSchema } from "yup";
import { HTTP_STATUS_CODES } from "../constants/http-status-codes";
import HttpError from "../utils/http-error";

const yupValidate =
  (schema: ObjectSchema<AnyObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      next(new HttpError(err.errors, HTTP_STATUS_CODES.BAD_REQUEST));
    }
  };

export default yupValidate;
