import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ParameterLog } from './parameter.log';

@Injectable()
export class LatencySimulatorMiddleware implements NestMiddleware {
  @ParameterLog()
  use(req: Request, res: Response, next: NextFunction) {
    setTimeout(() => next(), this.getRandomRange(100, 1000));
  }

  private getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}
