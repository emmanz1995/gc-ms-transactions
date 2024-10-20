import { Request, Response, NextFunction } from 'express';

interface IErrorCode {
  eCode: string;
  statusCode: number;
}

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: any = { ...err };
  error.msg = err.message;

  const code = getErrorCode(err);
  return res.status(code.statusCode).send({ msg: error.msg, code: code.eCode });
}

const getErrorCode = (err: Error) => {
  const errCode: IErrorCode = {
    eCode: 'md00',
    statusCode: 500,
  };

  if (err.constructor.name === 'BadRequest') {
    errCode.eCode = 'md01';
    errCode.statusCode = 400;
  } else if (err.constructor.name === 'UnprocessableContent') {
    errCode.eCode = 'md02';
    errCode.statusCode = 422;
  } else {
    errCode.eCode = 'md00';
    errCode.statusCode = 500;
  }

  return errCode;
};
