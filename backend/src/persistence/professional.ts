import { AbstractEntity } from './abstract.entity';

export class Professional extends AbstractEntity {
  name: string;
  registry: string;
  status: boolean;
}
