import {query} from '@pella/postgres-adapter';

const getBulletsBySlideId = async (slideId) => {
  console.log('TRIP TO DB [getBulletsBySlideId]: ', slideId);
  const sql = `
    SELECT *
    FROM author.bullet_point
    WHERE "slide_id" = $1
  `;
  const values = [slideId];
  const result = await query(sql, values);

  return result.rows;
};

const getBulletsBySlideIds = async (slideIds) => {
  console.log('TRIP TO DB [getBulletsBySlideIds]: ', slideIds);
  const sql = `
    SELECT *
    FROM author.bullet_point
    WHERE "slide_id" = Any($1)
    ORDER BY array_position($1, "slide_id")
  `;
  const values = [slideIds];
  const result = await query(sql, values);

  const rows = result?.rows;
  const response = [];
  
  slideIds.forEach((id) => {
    const bullets = [];

    while (rows.length >= 1 && rows[0].slide_id === id) {
      bullets.push(rows[0]);

      rows.shift();
    }

    response.push(bullets);
  });

  return response;
};





























































const getSlidesByPresentationId = async (presentationId) => {
  console.log('');
  console.log('TRIP TO DB [getSlidesByPresentationId]: ', presentationId);
  console.log('');

  const sql = `
    SELECT *
    FROM author.slide
    WHERE "presentation_id" = $1
  `;
  const values = [presentationId];
  const result = await query(sql, values);

  return result.rows;
};

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

export default {
  getById,
  getAll,
  getSlidesByPresentationId,
  getBulletsBySlideId,
  getBulletsBySlideIds,
}
