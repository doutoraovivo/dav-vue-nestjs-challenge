import { PickType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class CreatePersonResponseDto extends PickType(PersonDto, ['key'] as const) {}
