import { OmitType } from '@nestjs/swagger';
import { ProfessionalDto } from './professional.dto';

export class CreateProfessionalRequestDto extends OmitType(ProfessionalDto, [
  'key',
  'status',
] as const) {}
