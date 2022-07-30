import { PickType } from '@nestjs/swagger';
import { ProfessionalDto } from './professional.dto';

export class ReadParamProfessionalRequestDto extends PickType(ProfessionalDto, [
  'key',
] as const) {}
