import presentations from '../../../repositories/presentations.js';

const handler = async () => {
  console.log('getting presentations...');
  return await presentations.getAll();
};

export {
  handler,
};
