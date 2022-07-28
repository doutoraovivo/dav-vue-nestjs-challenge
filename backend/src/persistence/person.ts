import { AbstractEntity } from './abstract.entity';

export class Person extends AbstractEntity {
  name: string;
  birthDate: string;
  register: string;
  registerState: string;
}
