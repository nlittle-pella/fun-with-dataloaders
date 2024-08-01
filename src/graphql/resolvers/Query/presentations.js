const handler = async (_parent, _args, context) => {
  const presentations = context.dataSources.presentations;

  return await presentations.getAll();
};

export {
  handler,
};
