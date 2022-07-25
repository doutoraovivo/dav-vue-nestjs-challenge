import { Person } from '../../persistence/person';
import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsDateString, IsNotEmpty, IsString, Matches} from 'class-validator';

export class PersonDto {
  @ApiProperty({
    description: 'Chave',
    type: String,
    example: 'l5yhf10s0000vmdya5ccjhfp',
  })
  @IsString()
  key: Person['key'];

  @ApiProperty({
    description: 'Nome do Paciente',
    type: String,
    example: 'Luciano Jesus Lima',
  })
  @IsString()
  @IsNotEmpty()
  name: Person['name'];

  @ApiProperty({
    description: 'Data de Nascimento',
    type: String,
    format: 'date',
    example: '1979-12-23',
  })
  @IsNotEmpty()
  @IsDateString({})
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  birth_date: Person['birthDate'];

  @ApiProperty({
    description:
      'Se esta pessoa está ativa no sistema, status é verdadeiro. Senão não, falso.',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: Person['status'];
}
