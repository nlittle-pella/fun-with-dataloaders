import presentations from '../../../repositories/presentations.js';

const handler = async (_, args) => {
  const { name } = args.input;
  return await presentations.getByName(name);
};

export {
  handler,
};
