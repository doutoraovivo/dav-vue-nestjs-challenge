import { Professional } from '../../core/professionalPersistence/professional';
import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ProfessionalDto {
  @ApiProperty({
    description: 'Chave',
    type: String,
    example: 'l5yhf10s0000vmdya5ccjhfp',
  })
  @IsString()
  key: Professional['key'];

  @ApiProperty({
    description: 'Nome do profissional de saúde',
    type: String,
    example: 'Luciano Jesus Lima',
  })
  @IsString()
  @IsNotEmpty()
  name: Professional['name'];

  @ApiProperty({
    description:
      'Se esta pessoa está ativa no sistema, status é verdadeiro. Senão não, falso.',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: Professional['status'];

  @ApiProperty({
    description: 'Registro',
    type: String,
    example: 'CRM 12345/SP',
  })
  @IsString()
  @IsNotEmpty()
  register: Professional['register'];
}
