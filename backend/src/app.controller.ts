import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './base.controller';

/**
 *
 */
@Controller('backend')
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  /**
   *
   * @returns
   */
  @Get('/quote')
  getQuote() {
    return this.appService.getQuote();
  }
}
