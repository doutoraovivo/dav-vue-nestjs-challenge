import { ApiPropertyOptional } from '@nestjs/swagger';
import { PersonDto } from './person.dto';
import { IsOptional, IsString } from 'class-validator';

export class ReadQueryPersonRequestDto {
  @ApiPropertyOptional({
    description: 'Nome do Paciente',
    type: String,
    example: 'Luciano Jesus Lima',
  })
  @IsString()
  @IsOptional()
  name?: PersonDto['name'];

  @ApiPropertyOptional({
    description: 'Itens por Pagina',
    type: Number,
    example: 100,
  })
  @IsOptional()
  itemsPerPage?: number;
}
