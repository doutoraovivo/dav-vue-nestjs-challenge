import { OmitType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class UpdatePersonRequestDto extends OmitType(PersonDto, [
  'key',
  'status',
] as const) {}
