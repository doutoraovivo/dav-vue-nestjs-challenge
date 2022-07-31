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
    description: 'Sigla do registro',
    type: String,
    example: 'CRM',
  })
  @IsString()
  @IsNotEmpty()
  registerInitials: Professional['registerInitials'];

  @ApiProperty({
    description: 'Código do registro',
    type: String,
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  registerCode: Professional['registerCode'];

  @ApiProperty({
    description: 'Estado do registro',
    type: String,
    example: 'SP',
  })
  @IsString()
  @IsNotEmpty()
  registerState: Professional['registerState'];
}
