import { Professional } from 'src/persistence/professional';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';
import { constants } from 'src/util';

const regexForRegistryTest = new RegExp(
  `\\b(CRM|CRO|CRP) \\w+\\/(${constants.BRAZILIAN_STATES.join('|')})\\b`,
  'gm',
);
export class ProfessionalDto {
  @ApiProperty({
    description: 'Chave',
    type: String,
    example: 'l5yhf10s0000vmdya5ccjhfp',
  })
  @IsString()
  key: Professional['key'];

  @ApiProperty({
    description: 'Nome do Profissional',
    type: String,
    example: 'Médico da Silva',
  })
  @IsString({ message: 'O nome do profissional deve ser do tipo string.' })
  @IsNotEmpty({ message: 'O nome do profissional é obrigatório.' })
  name: Professional['name'];

  @ApiProperty({
    description: 'Registro do profissional.',
    type: String,
    example: 'CRM 12345/SP',
  })
  @IsString({ message: 'O registro do profissional deve ser do tipo string.' })
  @IsNotEmpty({ message: 'O registro do profissional é obrigatório.' })
  @Matches(regexForRegistryTest, {
    message:
      'O registro do profissional deve seguir a estrutura "SIGLA codigo/ESTADO", considerando que a sigla pode ser apenas CRO, CRM ou CRP, o código é numérico e o estado deve ser identificado por sigla.',
  })
  registry: Professional['registry'];

  @ApiProperty({
    description:
      'Se esta pessoa está ativa no sistema, status é verdadeiro. Senão não, falso.',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: Professional['status'];
}
