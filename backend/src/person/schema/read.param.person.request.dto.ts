import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';
import { IsOptional } from 'class-validator';

export class ReadParamPersonRequestDto extends PickType(PersonDto, [
  'key',
] as const) {}
