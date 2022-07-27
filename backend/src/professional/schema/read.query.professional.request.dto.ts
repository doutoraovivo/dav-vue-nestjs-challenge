import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProfessionalDto } from './professional.dto';
import { IsOptional, IsString } from 'class-validator';

export class ReadQueryProfessionalRequestDto {
  @ApiPropertyOptional({
    description: 'Nome do profissional',
    type: String,
    example: 'Médico da Silva',
  })
  @IsString()
  @IsOptional()
  name?: ProfessionalDto['name'];

  @ApiPropertyOptional({
    description: 'Itens por Pagina',
    type: Number,
    example: 100,
  })
  @IsOptional()
  itemsPerPage?: number;
}
