import { PickType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class ReadParamPersonRequestDto extends PickType(PersonDto, [
  'key',
] as const) {}
