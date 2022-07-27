import { Module } from '@nestjs/common';
import { ProfessionalDatabase } from 'src/persistence';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
  controllers: [ProfessionalController],
  providers: [ProfessionalService, ProfessionalDatabase],
})
export class ProfessionalModule {}
