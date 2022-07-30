import { PersonDatabase } from './src/core/personPersistence/person.database';

process.env.DEBUG = '*';

(async () => {
  const db = new PersonDatabase();
  // await db.clean();


  // await db.put({
  //   name: 'Luciano',
  //   birthDate: '1979-12-23',
  //   status: false,
  // });
  //
  // await db.put({
  //   name: 'Rafael',
  //   birthDate: '2018-12-19',
  //   status: true,
  // });

  const entities = await db.query(undefined,{ key: 'name', op: 'like', compare: `*${'z lim'.replace(/\s/, '*')}*` });

  console.debug(JSON.stringify(entities));
})();
