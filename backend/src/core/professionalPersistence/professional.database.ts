import { AbstractDatabase } from '../abstract.database';
import { Injectable } from '@nestjs/common';
import { Professional } from './professional';

@Injectable()
export class ProfessionalDatabase extends AbstractDatabase<Professional> {
  constructor() {
    super('professional');
  }
}
