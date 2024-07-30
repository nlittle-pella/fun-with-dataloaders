import {query} from '@pella/postgres-adapter';

const getByName = async (name) => {
  const sql = `
    SELECT *
    FROM author.presentation
    WHERE name = $1
  `;
  const values = [name];
  const result = await query(sql, values);

  return result.rows[0];
};

export default {
  getByName,
}
