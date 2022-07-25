import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonDatabase } from '../persistence';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonDatabase],
})
export class PersonModule {}
