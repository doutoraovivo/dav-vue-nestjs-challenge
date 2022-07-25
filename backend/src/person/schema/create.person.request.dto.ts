import { OmitType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class CreatePersonRequestDto extends OmitType(PersonDto, [
  'key',
  'status',
] as const) {}
