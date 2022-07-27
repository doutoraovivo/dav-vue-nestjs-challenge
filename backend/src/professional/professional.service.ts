import { Injectable } from '@nestjs/common';
import { ProfessionalDatabase } from '../persistence';
import { Criteria } from '../persistence/abstract.database';
import { Professional } from '../persistence/professional';

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
      registry: professional.registry,
      status: true,
    });
  }

  async update(
    key: Professional['key'],
    professional: Omit<Professional, 'key' | 'status'>,
  ) {
    const old = await this.dao.get(key);
    old.name = professional.name;
    old.registry = professional.registry;
    return this.dao.update(old);
  }
}
