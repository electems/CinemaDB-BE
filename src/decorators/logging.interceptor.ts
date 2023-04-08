import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl } = request;
    request.get('user-agent') || '';
    const requestData = request.body;
    this.logger.log(`${originalUrl} : `, requestData);

    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.log(`${originalUrl} ${statusCode} : `, response.req.res);
    });

    next();
  }
}
