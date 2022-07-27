import { OmitType } from '@nestjs/swagger';
import { ProfessionalDto } from './professional.dto';

export class UpdateProfessionalRequestDto extends OmitType(ProfessionalDto, [
  'key',
  'registry',
  'status',
] as const) {}
