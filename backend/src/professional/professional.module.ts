import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { ProfessionalDatabase } from '../core/professionalPersistence';
@Module({
  controllers: [ProfessionalController],
  providers: [ProfessionalService, ProfessionalDatabase],
})
export class ProfessionalModule {}
