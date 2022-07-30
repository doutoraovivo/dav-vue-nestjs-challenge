import { PickType } from '@nestjs/swagger';
import { ProfessionalDto } from './professional.dto';

export class CreateProfessionalResponseDto extends PickType(ProfessionalDto, ['key'] as const) {}
