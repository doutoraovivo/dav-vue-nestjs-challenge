import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(
  new ValidationPipe({
    always: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export abstract class BaseController {}
