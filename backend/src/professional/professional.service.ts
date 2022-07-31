import { ProfessionalDatabase } from '../core/professionalPersistence';
import { Criteria } from '../core/abstract.database';
import { Professional } from './../core/professionalPersistence/professional';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessionalService {
  constructor(private dao: ProfessionalDatabase) {}

  async query(itemsPerPage, ...criteria: Criteria[]): Promise<Professional[]> {
    return this.dao.query(itemsPerPage, ...criteria);
  }

  async get(key: Professional['key']): Promise<Professional> {
    return this.dao.get(key);
  }

  async delete(key: Professional['key']) {
    const old = await this.dao.get(key);
    old.status = false;
    await this.dao.update(old);
  }

  async put(professional: Omit<Professional, 'key' | 'status'>) {
    return this.dao.put({
      name: professional.name,
      registerInitials: professional.registerInitials,
      registerCode: professional.registerCode,
      registerState: professional.registerState,
      status: true,
    });
  }

  /**
   *
   * @param professional
   */
  async update(key: Professional['key'], professional: Omit<Professional, 'key' | 'status'>) {
    const old = await this.dao.get(key);
    old.name = professional.name;
    old.registerInitials = professional.registerInitials;
    old.registerCode = professional.registerCode;
    old.registerState = professional.registerState;
    return this.dao.update(old);
  }
}
