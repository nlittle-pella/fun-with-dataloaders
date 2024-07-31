import {query} from '@pella/postgres-adapter';

const getById = async (id) => {
  const sql = `
    SELECT *
    FROM author.presentation
    WHERE id = $1
  `;
  const values = [id];
  const result = await query(sql, values);

  return result.rows[0];
};

const getAll = async () => {
  const sql = `
    SELECT *
    FROM author.presentation
  `;
  const result = await query(sql);

  return result.rows;
};

const getSlidesByPresentationId = async (presentationId) => {
  const sql = `
    SELECT *
    FROM author.slide
    WHERE "presentation_id" = $1
  `;
  const values = [presentationId];
  const result = await query(sql, values);

  return result.rows;
};

export default {
  getById,
  getAll,
  getSlidesByPresentationId,
}
