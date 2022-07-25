import { Injectable } from '@nestjs/common';
import { PersonDatabase } from '../persistence';
import { Person } from '../persistence/person';
import { Criteria } from '../persistence/abstract.database';

@Injectable()
export class PersonService {
  constructor(private dao: PersonDatabase) {}

  async query(itemsPerPage, ...criteria: Criteria[]): Promise<Person[]> {
    return this.dao.query(itemsPerPage, ...criteria);
  }

  async get(key: Person['key']): Promise<Person> {
    return this.dao.get(key);
  }

  async delete(key: Person['key']) {
    const old = await this.dao.get(key);
    old.status = false;
    await this.dao.update(old);
  }

  async put(person: Omit<Person, 'key' | 'status'>) {
    return this.dao.put({
      name: person.name,
      birthDate: person.birthDate,
      status: true,
    });
  }

  /**
   *
   * @param person
   */
  async update(key: Person['key'], person: Omit<Person, 'key' | 'status'>) {
    const old = await this.dao.get(key);
    old.name = person.name;
    old.birthDate = person.birthDate;
    return this.dao.update(old);
  }
}
