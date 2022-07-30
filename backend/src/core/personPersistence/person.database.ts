import { AbstractDatabase } from '../abstract.database';
import { Injectable } from '@nestjs/common';
import { Person } from './person';

@Injectable()
export class PersonDatabase extends AbstractDatabase<Person> {
  constructor() {
    super('person');
  }
}
