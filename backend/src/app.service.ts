import { Injectable } from '@nestjs/common';
import { random } from 'quotesy';

@Injectable()
export class AppService {
  async getQuote() {
      return random();
  }
}
