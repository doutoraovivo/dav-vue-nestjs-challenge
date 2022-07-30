import { AceBase, DataReference } from 'acebase';
import { QueryOperator } from 'acebase-core/types/data-reference';
import { ParameterLog } from '../util';
import { EntityNotFound } from './error';
import { AbstractEntity } from './abstract.entity';

const db = new AceBase('local');

export interface Criteria {
  key: string | number;
  op: QueryOperator;
  compare?: any;
}

/**
 * Essa classe representa um DAO
 *
 * Candidato:
 * - O que essa classe se propoe a fazer?
 * - Ela faz parte de alguma camada? Qual?
 * - Ela é necessária ou você tem uma idéia melhor?
 *
 * Não se preocupe com a implementação do AceBase. Ele está aqui só como
 * um exemplo de banco de dados local para o exemplo. O DaV usa o AWS DynamoDB
 */
export abstract class AbstractDatabase<T extends AbstractEntity> {
  private readonly ref: DataReference;

  protected constructor(public readonly dbname) {
    this.ref = db.ref(dbname);
  }

  @ParameterLog()
  public async update(entity: T): Promise<T> {
    const ref = await db.ref(`${this.dbname}/${entity.key}`);
    if (await ref.exists()) {
      const all = { ...entity };
      delete all.key;
      const updated = (await (await ref.set({ ...all })).get()).val();

      return {
        key: updated.key,
        ...updated,
      };
    } else {
      throw new EntityNotFound();
    }
  }

  @ParameterLog()
  public async put(entity: T) {
    const ref = await this.ref.push(entity);
    return {
      key: ref.key,
      ...entity,
    };
  }

  @ParameterLog()
  public async get(key: string): Promise<T> {
    const ref = await db.ref(`${this.dbname}/${key}`).get();
    if (ref.exists()) {
      return {
        key: ref.key,
        ...ref.val(),
      } as T;
    } else {
      throw new EntityNotFound();
    }
  }

  /**
   * Remove uma entidade
   * @param key
   */
  @ParameterLog()
  public async delete(key: string): Promise<void> {
    const ref = db.ref(`${this.dbname}/${key}`);
    if (await ref.exists()) {
      await ref.remove();
    } else {
      throw new EntityNotFound();
    }
  }

  /**
   * Busca entidades
   * @param criteria
   */
  @ParameterLog()
  public async query(itemsPerPage = 1000, ...criteria: Criteria[]): Promise<T[]> {
    let query = this.ref.query().take(itemsPerPage);
    criteria.forEach(
      (criteria) =>
        (query = query.filter(criteria.key, criteria.op, criteria.compare)),
    );
    return (await query.get()).map((ref) => ({
      key: ref.key,
      ...ref.val(),
    }));
  }

  public async clean() {
    return this.ref.remove();
  }
}
