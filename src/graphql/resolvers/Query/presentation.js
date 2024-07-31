import presentations from '../../../repositories/presentations.js';

const handler = async (_, args) => {
  const { id } = args.input;
  return await presentations.getById(id);
};

export {
  handler,
};
